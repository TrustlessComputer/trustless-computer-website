import { ContractOperationHook, IOperationRequiredParams } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import BNSABIJson from '@/abis/bns.json';
import { BNS_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { stringToBuffer } from '@/utils';
import { Transaction } from 'ethers';

export interface ICheckIfRegisteredName {
  name: string;
}

const useRegistered: ContractOperationHook<ICheckIfRegisteredName, Transaction> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(BNS_CONTRACT, BNSABIJson.abi, true);

  const call = useCallback(
    async (params: ICheckIfRegisteredName & IOperationRequiredParams) => {
      if (account && provider && contract) {
        const { name } = params;
        const byteCode = stringToBuffer(name);
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

export default useRegistered;
