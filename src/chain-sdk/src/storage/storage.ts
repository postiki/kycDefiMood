import {ChainId, Credentials, WalletName} from '../types';

export interface Storage {
  getWallet(): Promise<WalletName | undefined>;
  resetWallet(): Promise<void>;
  saveWallet(name: WalletName): Promise<void>;
  getCredentials(): Promise<Credentials | undefined>;
  saveCredentials(signature: string): Promise<void>;
  resetCredentials(): Promise<void>;
  saveChainId(name: WalletName, chainId: ChainId): Promise<void>
  getChainId(name: WalletName): Promise<number | undefined>
}
