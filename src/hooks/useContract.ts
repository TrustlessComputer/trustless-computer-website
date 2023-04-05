import { getContract } from '@/utils';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';

export function useContract<T extends Contract = Contract>(
  contractAddress: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { provider, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!contractAddress || !ABI || !provider || !chainId) return null;
    try {
      return getContract(contractAddress, ABI, provider, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [contractAddress, ABI, provider, chainId, withSignerIfPossible, account]) as T;
}
