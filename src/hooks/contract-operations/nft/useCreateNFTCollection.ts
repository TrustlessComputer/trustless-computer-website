import { ContractOperationHook, DeployContractResponse } from '@/interfaces/contract-operation';
import ERC721ABIJson from '@/abis/erc721.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { ContractFactory } from 'ethers';
import { BFS_ADDRESS } from '@/configs';

export interface ICreateNFTCollectionParams {
  name: string;
  symbol: string;
}

const useCreateNFTCollection: ContractOperationHook<
  ICreateNFTCollectionParams,
  Promise<DeployContractResponse | null>
> = () => {
  const { account, provider } = useWeb3React();

  const call = useCallback(
    async (params: ICreateNFTCollectionParams): Promise<DeployContractResponse | null> => {
      if (account && provider) {
        const { name, symbol } = params;
        const factory = new ContractFactory(ERC721ABIJson.abi, ERC721ABIJson.bytecode, provider.getSigner());
        const contract = await factory.deploy(name, symbol, BFS_ADDRESS);

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

export default useCreateNFTCollection;
