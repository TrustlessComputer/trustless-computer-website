import { MetamaskConnection } from '@/connection';
import { SupportedChainId, TRUSTLESS_COMPUTER_CHAIN_INFO } from '@/constants/chains';
import { IResourceChain } from '@/interfaces/chain';
import { Connector } from '@web3-react/types';

const API_PATH = 'https://chainid.network/chains.json';

const getChainList = async (): Promise<Array<IResourceChain>> => {
  try {
    const res = await fetch(API_PATH);
    const data = await res.json();
    return [...data, TRUSTLESS_COMPUTER_CHAIN_INFO] as Array<IResourceChain>;
  } catch (err: unknown) {
    console.log('Failed to get chain list');
    console.log(err);
    return [TRUSTLESS_COMPUTER_CHAIN_INFO];
  }
};

export function isSupportedChain(chainId: number | null | undefined): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId];
}

export const switchChain = async (connector: Connector, chainId: SupportedChainId) => {
  if (!isSupportedChain(chainId)) {
    throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`);
  } else if (connector === MetamaskConnection.connector) {
    await connector.activate(chainId);
  } else {
    const chainList = await getChainList();
    const info = chainList.find((c: IResourceChain) => c.chainId === chainId);
    if (!info) {
      throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`);
    }
    const addChainParameter = {
      chainId,
      chainName: info.name,
      rpcUrls: info.rpc,
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: info.explorers,
    };
    await connector.activate(addChainParameter);
  }
};
