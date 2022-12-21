import type { Wallet, WalletContext } from './wallet';
import { MetamaskWallet } from './metamask-wallet';
import {WalletName} from "../types";

export function metamask() {
  return (ctx: WalletContext) => new MetamaskWallet(ctx.networks);
}

export function loadWallet(name: WalletName, ctx: WalletContext): Wallet {
  switch (name) {
    case 'metamask':
      return new MetamaskWallet(ctx.networks);
    default:
      throw new Error(`Failed to load wallet: ${name}`);
  }
}
