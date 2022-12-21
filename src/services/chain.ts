import {
  Account, Checker,
  Client,
  LocalStorage,
  metamask
} from '../chain-sdk/src';
import { ClientOptions } from '../chain-sdk/src/client';

export const chainStorage = new LocalStorage();
const clientConfig: ClientOptions = {
  storage: chainStorage,
  configUrl: process.env.REACT_APP_CHAINS_CONFIG_URL,
};
export const createChainClient = () => new Client({ ...clientConfig });
export const client = createChainClient();
export const checker = new Checker(client)
export function connectWallet() {
  const factory = metamask;

  if (!factory) {
    throw new Error(`Factory for wallet metamask not found.`);
  }

  return client.connect(factory())
}
export const getAddr = () => client.signer.getAddress()

export const checkOwner = async () => {
  await checker.getOwnerAddr('0xA452e31b35b263841Dc15559Ef1CdB37974164b3').then(r => console.log(r))
}