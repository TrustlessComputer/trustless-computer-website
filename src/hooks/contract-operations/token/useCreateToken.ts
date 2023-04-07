import { ContractOperationHook, DeployContractResponse } from '@/interfaces/contract-operation';
import ERC20ABIJson from '@/abis/erc20.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { ContractFactory } from 'ethers';

export interface ICreateTokenParams {
  name: string;
  symbol: string;
  maxSupply: number;
}

const useCreateToken: ContractOperationHook<ICreateTokenParams, Promise<DeployContractResponse | null>> = () => {
  const { account, provider } = useWeb3React();

  const call = useCallback(
    async (params: ICreateTokenParams): Promise<DeployContractResponse | null> => {
      if (account && provider) {
        const { name, symbol, maxSupply } = params;
        const factory = new ContractFactory(ERC20ABIJson.abi, ERC20ABIJson.bytecode, provider.getSigner());
        const contract = await factory.deploy(name, symbol, maxSupply);

        console.log(contract);

        return {
          hash: contract.deployTransaction.hash,
          contractAddress: contract.address,
          deployTransaction: contract.deployTransaction,
        };
      }

      return null;
    },
    [account, provider],
  );

  return {
    call: call,
  };
};

export default useCreateToken;
