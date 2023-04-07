import { ContractOperationHook } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import BNSABIJson from '@/abis/bns.json';
import { BNS_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { stringToBuffer } from '@/utils';
import { Transaction } from 'ethers';

export interface IRegisterNameParams {
  name: string;
}

const useRegister: ContractOperationHook<IRegisterNameParams, Promise<Transaction | null>> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(BNS_CONTRACT, BNSABIJson.abi, true);

  const call = useCallback(
    async (params: IRegisterNameParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        const { name } = params;
        const byteCode = stringToBuffer(name);
        const transaction = await contract.connect(provider.getSigner()).register(account, byteCode);
        return transaction;
      }

      return null;
    },
    [account, provider, contract],
  );

  return {
    call,
  };
};

export default useRegister;
