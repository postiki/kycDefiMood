import { Balances } from '../types';
import { fetchBalances } from '../utils';
import { Module } from './module';

export class Account extends Module {
  public async getBalances(address?: string): Promise<Balances> {
    if (!address) {
      return this.client.balances;
    }

    return fetchBalances(this.client.networks, address);
  }

  protected override init() { }
}
