import { ContractOperationHook } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

export interface IPreserveChunkParams {
  address: string;
  chunks: ArrayBuffer;
}

const usePreserveChunks: ContractOperationHook<IPreserveChunkParams, any> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(ARTIFACT_CONTRACT, ArtifactABIJson.abi, true);

  const call = useCallback(
    async (params: IPreserveChunkParams) => {
      if (account && provider && contract) {
        const { address, chunks } = params;
        const transaction = await contract.connect(provider.getSigner()).preserveChunks(address, chunks);
        return transaction;
      }
    },
    [account, provider, contract],
  );

  return {
    call,
  };
};

export default usePreserveChunks;
