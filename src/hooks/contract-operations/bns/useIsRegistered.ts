import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import BNSABIJson from '@/abis/bns.json';
import { BNS_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { stringToBuffer } from '@/utils';

export interface ICheckIfRegisteredNameParams {
  name: string;
}

const useIsRegistered: ContractOperationHook<ICheckIfRegisteredNameParams, Promise<boolean>> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(BNS_CONTRACT, BNSABIJson.abi, false);

  const call = useCallback(
    async (params: ICheckIfRegisteredNameParams): Promise<boolean> => {
      if (account && provider && contract) {
        const { name } = params;
        const byteCode = stringToBuffer(name);
        const transaction = await contract.connect(provider).registered(byteCode);
        return transaction;
      }

      return false;
    },
    [account, provider, contract],
  );

  return {
    call,
    dAppType: DAppType.BNS,
  };
};

export default useIsRegistered;
