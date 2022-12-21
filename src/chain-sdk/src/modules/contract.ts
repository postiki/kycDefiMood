import { ethers } from 'ethers';
import type { Network } from '../types';
import { Module } from './module';

export abstract class Contract extends Module {
  protected abstract readonly name: keyof Network['contracts'];

  private _address = ethers.constants.AddressZero;

  protected get address() {
    return this._address;
  }

  protected override init() {
    const address = this.client.network.contracts[this.name];
    this._address = address;
  }
}
