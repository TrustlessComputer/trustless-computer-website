import { ContractOperationHook, IOperationRequiredParams } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

export interface IPreserveChunkParams {
  address: string;
  chunks: Buffer;
}

const usePreserveChunks: ContractOperationHook<IPreserveChunkParams, any> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(ARTIFACT_CONTRACT, ArtifactABIJson.abi, true);

  const call = useCallback(
    async (params: IPreserveChunkParams & IOperationRequiredParams) => {
      if (account && provider && contract) {
        const { address, chunks, gasPrice, nonce } = params;
        const transaction = await contract.connect(provider).preserveChunks(address, [chunks], {
          gasPrice,
          nonce,
        });
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
