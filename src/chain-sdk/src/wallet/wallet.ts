import type { providers, Signer } from 'ethers';
import { TypedEmitter } from 'tiny-typed-emitter';
import type {NetworkConfig, WalletEvents, Chain, Network, WalletName, Credentials} from '../types';

export enum LoginStatus {
  NoWallet,
  EmptyCredentials,
  Success,
  WrongNetwork,
  SessionExpired
}

export interface ConnectionCache {
  credentials?: Credentials;
  network?: Network
}

export interface Wallet extends TypedEmitter<WalletEvents> {
  readonly name: WalletName;
  readonly instances: Map<Chain, providers.Provider>;
  connect(cache?: ConnectionCache): Promise<void>;
  getSigner(chain: string): Promise<Signer>;
  getCredentials(msg: string): Promise<Credentials>;
  disconnect(): Promise<void>;
  getChainId(): Promise<number>;
}

export interface WalletContext {
  networks: NetworkConfig;
  cachedCredentials?: Credentials;
}

export type WalletFactory = (ctx: WalletContext) => Wallet;
