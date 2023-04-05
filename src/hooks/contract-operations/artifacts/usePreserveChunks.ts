import { ContractOperationHook } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

interface IParams {
  address: string;
  chunks: Array<Buffer>;
}

const usePreserveChunks: ContractOperationHook<IParams, void> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(ARTIFACT_CONTRACT, ArtifactABIJson.abi);

  const call = useCallback(
    async (params: IParams) => {
      if (account && provider && contract) {
        const { address, chunks } = params;
        await contract.connect(provider).functions.preserveChunks(address, chunks);
      }
    },
    [account, provider, contract],
  );

  return {
    call,
  };
};

export default usePreserveChunks;
