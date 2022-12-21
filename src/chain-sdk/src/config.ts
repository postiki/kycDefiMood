import { errorCodes } from 'eth-rpc-errors';
import { ethers } from 'ethers';
import { Chain, Network, NetworkConfig, ProviderRpcError } from './types';
import { dangerousObjectEntries } from './utils';

const { AddressZero: zero } = ethers.constants;

const emptyChain: Network = {
  name: '',
  symbol: '',
  chainId: 0,
  contracts: { checker: zero},
  blockExplorerUrl: '',
  rpcUrl: '',
};

export const emptyConfig: NetworkConfig = { bsc: emptyChain };

const mapConfig = async ([networkName, networkConfig]: [Chain, Network]) => {
  const urls = [networkConfig.rpcUrl];

  if (urls.length === 0) {
    throw new ProviderRpcError(errorCodes.rpc.resourceUnavailable, `No one RPC URL is working`);
  }

  if (urls.length !== urls.length) {
    console.warn(`Some of given RPC URLs are not working.`, {
      given: urls,
      working: urls
    });
  }

  return [
    networkName,
    {
      ...networkConfig,
      rpcUrl: networkConfig.rpcUrl,
    }
  ];
}

export async function fetchConfig(path: string = 'http://localhost:3000/testnet'): Promise<NetworkConfig> { //TODO add prod link
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error('Failed to fetch chain config');
  }

  const config = NetworkConfig.parse(await res.json());
  const entries = dangerousObjectEntries(config);
  const entriesWithCheckedUrls = await Promise.all(entries.map(mapConfig));
  return Object.fromEntries(entriesWithCheckedUrls);
}