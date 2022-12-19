import {Account, LocalStorage} from '../chain-sdk/src'
import {Client, ClientOptions } from '../chain-sdk/src/client';

export const chainStorage = new LocalStorage();

const clientConfig: ClientOptions = {
  storage: chainStorage,
  configUrl: process.env.REACT_APP_CHAINS_CONFIG_URL,
};

export const createChainClient = () => new Client({ ...clientConfig });

export const client = createChainClient();