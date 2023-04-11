import { MetamaskConnection } from '@/connection';
import { SupportedChainId, TRUSTLESS_COMPUTER_CHAIN_INFO } from '@/constants/chains';
import { IResourceChain } from '@/interfaces/chain';
import { Connector } from '@web3-react/types';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { error } from 'console';

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
  } else if (window.ethereum) {
    try {
      await Object(window.ethereum).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      });
    } catch (err: unknown) {
      if (Object(err).code !== 4902) throw err;

      const chainList = await getChainList();
      const info = chainList.find((c: IResourceChain) => c.chainId === chainId);
      if (!info) {
        throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`);
      }

      const params = {
        chainId: Web3.utils.toHex(info.chainId),
        chainName: info.name,
        nativeCurrency: {
          name: info.nativeCurrency.name,
          symbol: info.nativeCurrency.symbol,
          decimals: info.nativeCurrency.decimals,
        },
        rpcUrls: info.rpc,
        blockExplorerUrls: [
          info.explorers && info.explorers.length > 0 && info.explorers[0].url ? info.explorers[0].url : info.infoURL,
        ],
      };

      await Object(window.ethereum).request({
        method: 'wallet_addEthereumChain',
        params: [params],
      });
    }
  }
};
