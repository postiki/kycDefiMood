import {BigNumber, ethers, providers} from 'ethers';
import {TypedEmitter} from 'tiny-typed-emitter';
import {emptyConfig, fetchConfig} from './config';
import type {Storage} from './storage';
import {
    Balance,
    Balances,
    Chain,
    IClientConnectedInfo,
    Network,
    NetworkConfig,
    ProviderRpcError,
} from './types';
import {
    ConnectionCache,
    DummyWallet,
    loadWallet,
    LoginStatus,
    Wallet,
    WalletContext,
    WalletFactory
} from './wallet';
import {dangerousObjectEntries, getInitialBalances, isChainIdSupported} from './utils';
import {errorCodes} from 'eth-rpc-errors';

export interface ClientOptions {
    storage: Storage;
    configUrl?: string;
}

interface ClientEvents {
    connect(connectInfo: IClientConnectedInfo): void;

    disconnect(): void;

    accountChanged(address: string): void;

    networkChanged(network: Network): void;

    error(err: Error): void;

    balanceUpdated(chain: Chain, newBalance: BigNumber): void;
}

export class Client extends TypedEmitter<ClientEvents> {
    private readonly _storage: Storage;
    private readonly _configUrl?: string;

    private _networks = emptyConfig;
    private _chain: Chain = 'eth';

    private _connected = false;

    private _wallet: Wallet = new DummyWallet();
    private _signer?: ethers.Signer;

    public balances: Balances = getInitialBalances();

    constructor(options: ClientOptions) {
        super();
        this._storage = options.storage;
        this._configUrl = options.configUrl;
    }

    public get connected() {
        return this._connected;
    }

    public get chain() {
        return this._chain;
    }

    public get network() {
        return this._networks[this._chain];
    }

    public get networks() {
        return this._networks;
    }

    public get signer() {
        if (!this._signer) {
            throw new Error('Client is not initialized');
        }

        return this._signer;
    }

    public async connect<T extends Wallet = Wallet>(factory?: WalletFactory): Promise<Wallet | null> {
        if (this._connected) {
            return this._wallet as T;
        }
        const networks: NetworkConfig = await fetchConfig(this._configUrl);

        const ctx: WalletContext = {
            networks,
        };

        this._networks = networks;

        if (factory) {
            this.wallet = factory(ctx);
        } else {
            const wallet = await this._storage.getWallet();

            if (!wallet) {
                return null;
            }

            this.wallet = loadWallet(wallet, ctx);
        }

        const cache: ConnectionCache = {
            credentials: await this._storage.getCredentials(),
        }

        await this.wallet.connect(cache);
        await this.setInitialChain();
        await this._storage.saveWallet(this.wallet.name);

        const chainId = await this.signer.getChainId();
        const chain = this.getChainById(chainId);

        await this._storage.saveChainId(this.wallet.name, chainId);

        this._connected = true;
        this.emit('connect', {chain});

        return this._wallet as T;
    }

    public async switchNetwork(chain: Chain) {
        this._signer = await this.wallet.getSigner(chain);

        this._chain = chain;
        this.emit('networkChanged', this._networks[chain]);

        await this._storage.saveChainId(this.wallet.name, this.network.chainId)
    }

    public async getCredentials(msg: string = 'mintilka') {
        try {
            return await this.wallet.getCredentials(msg);
        } catch (error) {
            console.error(error);
            throw new ProviderRpcError(errorCodes.provider.userRejectedRequest, 'Sign message in your wallet');
        }
    }

    public async disconnect() {
        await this._storage.resetWallet();
        await this._storage.resetCredentials();

        if (this._connected) {
            await this.wallet.disconnect();
            this.wallet = new DummyWallet();
            this._signer = undefined;

            this._connected = false;
        }
    }


    private get wallet() {
        return this._wallet;
    }

    private set wallet(wallet: Wallet) {
        this._wallet.removeAllListeners();

        wallet.on('accountsChanged', this.handleAccountChange);
        wallet.on('error', (error) => this.emit('error', error));
        wallet.on('chainChanged', this.handleChainChange);
        wallet.on('connect', connectInfo => {
            // @ts-ignore
            this.emit('connect', {chain: this.getChainById(connectInfo.chainId)});
        });
        wallet.on('disconnect', () => {
            this.disconnect();
            this.emit('disconnect');
        });

        this._wallet = wallet;
    }

    private handleAccountChange = async (address: string) => {
        await this._storage.resetCredentials();

        this.balances = getInitialBalances();
        this.emit('accountChanged', address);
    };

    private handleChainChange = async (chainId: number) => {
        try {
            const chain = this.getChainById(chainId);
            // @ts-ignore
            await this.switchNetwork(chain);
        } catch (err: unknown) {
            console.error(err);
            this.emit('error', new ProviderRpcError(errorCodes.provider.chainDisconnected, 'Error while switching network'));
        }
    };

    private getChainById(chainId: number) {
        const chain = dangerousObjectEntries(this._networks)
            .reduce<Chain | null>((acc, [chain, config]) => (config.chainId === chainId ? chain : acc), null);

        if (!chain) {
            throw new Error(`Chain for chainId ${chainId} was not found in config.`);
        }

        return chain;
    }

    /**
     * Sets default network (ETH) if initial wallet's network is not supported.
     * For example, if wallet has MATIC network when user attempts to connect, network will be changed to ETH.
     * But if user's wallet has BSC network, nothing will happen, because BSC is supported.
     */
    private async setInitialChain() {
        try {
            const chainId = await this._storage.getChainId(this.wallet.name) ?? await this.wallet.getChainId();

            if (chainId && isChainIdSupported(this._networks, chainId)) {
                // @ts-ignore
                this._chain = this.getChainById(chainId);
                this._signer = await this.wallet.getSigner(this.chain);

            } else {
                await this.switchNetwork('eth');

            }

        } catch (error) {
            console.error(error);
            throw new ProviderRpcError(LoginStatus.WrongNetwork, 'Failed to set initial chain.');
        }
    }

    private async subscribeForBalanceUpdates() {
        const address = await this.signer.getAddress();

        this.wallet.instances.forEach(async (provider, chain) => {
            const initialBalance = await provider.getBalance(address);
            this.updateBalance(chain, initialBalance);

            provider.on('block', () => this.blockMinedListener(provider, chain, address));
        });
    }

    private async blockMinedListener(provider: providers.Provider, chain: Chain, address: string) {
        const newBalance = await provider.getBalance(address);
        const prevBalance = this.balances[chain];

        if (!newBalance.eq(prevBalance)) {
            this.updateBalance(chain, newBalance);
        }
    }

    private updateBalance(chain: Chain, newBalance: Balance) {
        this.balances[chain] = newBalance;
        this.emit('balanceUpdated', chain, newBalance);
    }
}
