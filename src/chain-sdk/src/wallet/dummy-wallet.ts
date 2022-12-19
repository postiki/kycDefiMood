import { Signer } from 'ethers';
import { Wallet } from './wallet';
import { TypedEmitter } from 'tiny-typed-emitter';
import {Chain, Credentials, WalletEvents} from '../types';
import { JsonRpcProvider } from '@ethersproject/providers';

export class DummyWallet extends TypedEmitter<WalletEvents> implements Wallet {
  public readonly name = 'void';
  public readonly instances: Map<Chain, JsonRpcProvider> = new Map();

  public async connect(): Promise<void> {
    throw new Error('Not implemented');
  }

  public async getSigner(): Promise<Signer> {
    throw new Error('Not implemented');
  }

  public async getCredentials(): Promise<Credentials> {
    throw new Error('Not implemented');
  }

  public async disconnect() {
    throw new Error('Not implemented');
  }

  getChainId(): Promise<number> {
    throw new Error('Not implemented');
  }
}
