import { errorCodes } from 'eth-rpc-errors';
import { BigNumber, providers, utils } from 'ethers';
import { z } from 'zod';
import { RPC_POLLING_INTERVAL } from './constants';
import { Balances, EthereumProvider, InjectedProvider, Network, NetworkConfig, ProviderRpcError } from './types';

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];


export function dangerousObjectKeys<T extends {}>(obj: T) {
  return Object.keys(obj) as Array<Extract<keyof T, string>>;
}

export function dangerousObjectEntries<T extends {}>(obj: T) {
  return Object.entries(obj) as Entries<T>;
}


export function toError(value: unknown) {
  if (value instanceof Error) {
    return value;
  }

  if (typeof value === 'string') {
    return new Error(value);
  }

  return new Error('Unknown error');
}

export function toProviderRpcError(error: unknown) {
  if (isProviderRpcError(error)) {
    return new ProviderRpcError(error.code, error.message, error.data)
  } else {
    return new ProviderRpcError(errorCodes.rpc.internal, toError(error).message);
  }
}

export function isProviderRpcError(error: unknown): error is ProviderRpcError {
  return z.instanceof(ProviderRpcError).safeParse(error).success;
}

export function serializeChainId(chainId: number) {
  return utils.hexStripZeros(utils.hexlify(chainId));
}

export function serializeNetwork(net: Network) {
  return {
    chainId: serializeChainId(net.chainId),
    chainName: net.name,
    rpcUrls: [net.rpcUrl],
    blockExplorerUrls: [net.blockExplorerUrl],
    nativeCurrency: {
      name: net.name,
      symbol: net.symbol,
      decimals: 18,
    },
  };
}

export function isChainIdSupported(networks: NetworkConfig, chainId: number) {
  const supportedChainIds = Object.values(networks).map(({ chainId }) => chainId);
  return supportedChainIds.includes(chainId);
}

export const getInitialBalances = () => ({
  eth: BigNumber.from(0),
});

export const mapProviderByProtocol = (url: string) => {
  if (url.startsWith('ws')) {
    return new providers.WebSocketProvider(url)
  }

  const provider = new providers.JsonRpcProvider(url);
  provider.pollingInterval = RPC_POLLING_INTERVAL;

  return provider;
}

/**
 * If a user has both Metamask and Coinbase Wallet extensions installed, 
 * connecting to the injected provider can lead to a situation where both extensions raise a 
 * pop-up window to connect wallet.
 * @link https://docs.cloud.coinbase.com/wallet-sdk/docs/injected-provider-guidance
 */
export function handleMultipleWalletExtensions(
  provider: EthereumProvider,
  predicate = (p: InjectedProvider) => p.isMetaMask,
  defaultValue = provider
) {
  const { providers = [] } = provider;
  return providers.find(predicate) ?? defaultValue;
}

export function fetchBalances(networks: NetworkConfig, address: string): Promise<Balances> {
  const entries = dangerousObjectEntries(networks);
  return entries.reduce(async (acc, [chain, { rpcUrl }]) => {
    const provider = new providers.JsonRpcProvider(rpcUrl);
    const balance = await provider.getBalance(address);
    const prevBalances = await acc;

    return {
      ...prevBalances,
      [chain]: balance
    }
  }, new Promise<Balances>((r) => r(getInitialBalances())))
}
