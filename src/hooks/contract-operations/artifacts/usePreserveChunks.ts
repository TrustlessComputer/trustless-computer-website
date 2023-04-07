import { ContractOperationHook, IOperationRequiredParams } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import Web3 from 'web3';
import { Transaction } from 'ethers';

export interface IPreserveChunkParams {
  address: string;
  chunks: Buffer;
}

const usePreserveChunks: ContractOperationHook<IPreserveChunkParams, Transaction> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(ARTIFACT_CONTRACT, ArtifactABIJson.abi, true);

  const call = useCallback(
    async (params: IPreserveChunkParams & IOperationRequiredParams) => {
      if (account && provider && contract) {
        const { address, chunks, gasPrice, nonce } = params;
        console.log('nonce', nonce);
        let customOptions: any = {} as IOperationRequiredParams;
        if (gasPrice > -1) {
          customOptions = {
            gasPrice,
            nonce: Web3.utils.toHex(nonce),
          };
        }
        console.log('customOptions', customOptions);
        const transaction = await contract
          .connect(provider.getSigner())
          .preserveChunks(address, [chunks], { ...customOptions });
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
