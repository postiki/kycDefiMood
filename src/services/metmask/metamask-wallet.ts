import {providers, Signer} from 'ethers';
import {errorCodes} from 'eth-rpc-errors'

import {
    Chain,
    EthereumProvider,
    MetamaskWindow, Network, NetworkConfig,
    ProviderRpcError,
} from './types';
import {handleMultipleWalletExtensions, serializeChainId, serializeNetwork} from "./utils";
import {z} from "zod";

export class MetamaskWallet {
    public readonly name = 'metamask';
    private _chain: Chain = 'eth';
    private readonly _networks: NetworkConfig = {
        eth: {
            name: "Ethereum Mainnet",
            symbol: 'ETH',
            rpcUrl: "https://mainnet.infura.io/v3/",
            chainId: 1,
            blockExplorerUrl: 'https://etherscan.io',
        }
    };
    public readonly instances = new Map<Chain, providers.Provider>();
    private _provider?: EthereumProvider;
    private _signer?: Signer;

    constructor() {
        this.setInstances(this._networks[this._chain]);
    }

    private setInstances(network: Network) {

        const provider = new providers.JsonRpcProvider(network.rpcUrl);

        this.instances.set(
            'eth',
            provider
        );

    }

    private getInjectedProvider() {
        if (this._provider) {
            return this._provider;
        }

        const win = window as MetamaskWindow;
        const metamaskProvider = win.ethereum && handleMultipleWalletExtensions(win.ethereum, p => p.isMetaMask);

        if (
            !win.ethereum ||
            !win.ethereum.isMetaMask ||
            typeof win.ethereum.request !== 'function' ||
            !metamaskProvider
        ) {
            throw new ProviderRpcError(errorCodes.provider.unsupportedMethod, 'Not install extension')
        }

        this._provider = metamaskProvider;
        return metamaskProvider;
    }

    public async connect() {
        const provider = this.getInjectedProvider();

        await provider.request?.({method: 'eth_requestAccounts'});
        await this.getSigner(this._chain)
    }

    public async getSigner(chain: Chain): Promise<Signer> {
        if (
            this._chain &&
            this._signer &&
            this._networks[chain].chainId === this._networks[this._chain].chainId
        ) {
            return this._signer;
        }

        const network = this._networks[chain];
        const provider = this.getInjectedProvider();

        try {
            await provider.request?.({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: serializeChainId(network.chainId)}],
            });
        } catch (err: unknown) {
            if (z.object({code: z.number()}).parse(err).code !== 4902) {
                throw err;
            }

            await provider.request?.({
                method: 'wallet_addEthereumChain',
                params: [serializeNetwork(network)],
            });
        }

        this._signer = new providers.Web3Provider(provider).getSigner();
        this._chain = chain;
        return this._signer;
    }

    public getAddr() {
        return this._signer?.getAddress()
    }
}
