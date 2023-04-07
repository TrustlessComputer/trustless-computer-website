import { ContractOperationHook, IOperationRequiredParams } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import BNSABIJson from '@/abis/bns.json';
import { BNS_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

export interface IPreserveChunkParams {
  byteCode: string;
}

const useRegister: ContractOperationHook<IPreserveChunkParams, any> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(BNS_CONTRACT, BNSABIJson.abi, true);

  const call = useCallback(
    async (params: IPreserveChunkParams & IOperationRequiredParams) => {
      if (account && provider && contract) {
        const { byteCode } = params;
        const transaction = await contract.connect(provider).registered(byteCode);
        return transaction;
      }
    },
    [account, provider, contract],
  );

  return {
    call,
  };
};

export default useRegister;
