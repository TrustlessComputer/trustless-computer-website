import { ContractOperationHook } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { Transaction } from 'ethers';

export interface IPreserveChunkParams {
  address: string;
  chunks: Buffer;
}

const usePreserveChunks: ContractOperationHook<IPreserveChunkParams, Promise<Transaction | null>> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(ARTIFACT_CONTRACT, ArtifactABIJson.abi, true);

  const call = useCallback(
    async (params: IPreserveChunkParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        const { address, chunks } = params;
        const transaction = await contract.connect(provider.getSigner()).preserveChunks(address, [chunks]);

        return transaction;
      }

      return null;
    },
    [account, provider, contract],
  );

  return {
    call: call,
  };
};

export default usePreserveChunks;
