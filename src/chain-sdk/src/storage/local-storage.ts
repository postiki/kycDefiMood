import type { Storage } from './storage';
import {ChainId, Credentials, WalletName} from '../types';

export class LocalStorage implements Storage {
  private readonly _key = 'wallet';
  private readonly _credentialsKey = 'credentials';
  private readonly _chainId = 'chainId';

  public async getWallet() {
    const name = localStorage.getItem(this._key);
    console.log(name)

    if (name) {
      return WalletName.parse(name);
    }
  }

  public async saveWallet(name: WalletName) {
    localStorage.setItem(this._key, name);
  }

  public async resetWallet() {
    localStorage.removeItem(this._key);
  }

  public async getChainId(name: WalletName) {
    const storage = localStorage.getItem(this._chainId);

    if (storage) {
      const parsedStorage = JSON.parse(storage);
      return ChainId.parse(parsedStorage[name]);
    }
  }

  public async saveChainId(name: WalletName, chainId: ChainId) {
    const prevState = localStorage.getItem(this._chainId);
    if (prevState) {
      const parsedState = JSON.parse(prevState);

      localStorage.setItem(this._chainId, JSON.stringify({ ...parsedState, [name]: chainId }));
    }
  }

  public async getCredentials() {
    const credentialsJSON = localStorage.getItem(this._credentialsKey);

    if (credentialsJSON) {
      const credentials = JSON.parse(credentialsJSON);

      return Credentials.parse(credentials);
    }
  }

  public async saveCredentials(credentials: string): Promise<void> {
    return localStorage.setItem(this._credentialsKey, JSON.stringify(credentials));
  }

  public async resetCredentials() {
    return localStorage.removeItem(this._credentialsKey);
  }
}
