import { BigNumberish, providers, Signer, utils } from 'ethers';
import { z } from 'zod';
import { TypedEmitter } from 'tiny-typed-emitter';
import { errorCodes, EthereumProviderError } from 'eth-rpc-errors'

import {
  NetworkConfig,
  Chain,
  EthereumProvider,
  MetamaskWindow,
  WalletEvents,
  ProviderRpcError,
  bigint,
  SignatureCredentials
} from '../types';
import { LoginStatus, Wallet } from './wallet';
import { dangerousObjectKeys, handleMultipleWalletExtensions, isProviderRpcError, mapProviderByProtocol, serializeChainId, serializeNetwork, toError, toProviderRpcError } from '../utils';

export class MetamaskWallet extends TypedEmitter<WalletEvents> implements Wallet {
  public readonly name = 'metamask';
  public readonly instances = new Map<Chain, providers.Provider>();

  private readonly _networks: NetworkConfig;

  private _provider?: EthereumProvider;
  private _signer?: Signer;
  private _chain?: Chain;

  private _signature = '';

  constructor(networks: NetworkConfig) {
    super();
    this._networks = networks;
    this.setInstances(this._networks);
  }

  public async connect() {
    const provider = this.getInjectedProvider();

    await provider.request?.({ method: 'eth_requestAccounts' });
    this.initSubscriptions(provider);
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
        params: [{ chainId: serializeChainId(network.chainId) }],
      });
    } catch (err: unknown) {
      if (z.object({ code: z.number() }).parse(err).code !== 4902) {
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

  public async getCredentials(msg: string): Promise<SignatureCredentials> {
    if (!this._signer) {
      throw new Error('Signer is not initialized');
    }

    if (!this._signature) {
      this._signature = await this._signer.signMessage(utils.id(msg));
    }
    return { type: 2, msg, signature: this._signature, walletName: 'metamask' };
  }

  public async disconnect() {
    this._provider?.removeAllListeners?.();
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

  private initSubscriptions(provider: EthereumProvider) {
    provider.on?.('accountsChanged', (data) => {
      try {
        const [account] = z.string().array().parse(data);
        if (account) {
          this.emit('accountsChanged', utils.getAddress(account));
        } else {
          this.emit('error', new EthereumProviderError(errorCodes.provider.disconnected, 'MetaMask wallet is locked'));
        }
      } catch (err: unknown) {
        if (isProviderRpcError(err)) {
          this.emit('error', new EthereumProviderError(err.code, err.message, err.data));
        } else {
          const _err = toError(err);
          this.emit('error', new EthereumProviderError(errorCodes.rpc.internal, _err.message));
        }
      }
    });

    provider.on?.('chainChanged', (data: BigNumberish) => {
      try {
        const chainId = bigint(data).toNumber();
        this.emit('chainChanged', chainId);
      } catch (err: unknown) {
        this.emit('error', toProviderRpcError(err));
      }
    });
  }

  private setInstances(networks: NetworkConfig) {
    for (const key of dangerousObjectKeys(networks)) {
      const network = networks[key];
      const rpcURL = network.rpcUrl;
      const provider = mapProviderByProtocol(rpcURL);

      this.instances.set(
        key,
        provider
      );
    }
  }

  async getChainId(): Promise<number> {
    if (!this._provider?.request) {
      throw new ProviderRpcError(LoginStatus.NoWallet, 'Provider is not initialized yet.');
    }

    const chainId = await this._provider.request({
      method: 'eth_chainId'
    });

    return parseInt(chainId, 16);
  }
}
