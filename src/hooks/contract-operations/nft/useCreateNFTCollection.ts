import { ContractOperationHook, DeployContractResponse } from '@/interfaces/contract-operation';
import ERC721ABIJson from '@/abis/erc721.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import { ContractFactory } from 'ethers';
import { BFS_ADDRESS } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import * as TC_SDK from 'trustless-computer-sdk';
import BigNumber from 'bignumber.js';

export interface ICreateNFTCollectionParams {
  name: string;
  symbol: string;
}

const useCreateNFTCollection: ContractOperationHook<
  ICreateNFTCollectionParams,
  Promise<DeployContractResponse | null>
> = () => {
  const { account, provider } = useWeb3React();
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: ICreateNFTCollectionParams): Promise<DeployContractResponse | null> => {
      if (account && provider) {
        const { name, symbol } = params;
        const byteCode = ERC721ABIJson.bytecode;
        console.log({
          tcTxSizeByte: Buffer.byteLength(byteCode),
          feeRatePerByte: feeRate.fastestFee,
        });
        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: Buffer.byteLength(byteCode),
          feeRatePerByte: feeRate.fastestFee,
        });
        const balanceInBN = new BigNumber(btcBalance);
        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error('Your balance is insufficient. Please top up BTC to pay network fee.');
        }

        const factory = new ContractFactory(ERC721ABIJson.abi, byteCode, provider.getSigner());
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
