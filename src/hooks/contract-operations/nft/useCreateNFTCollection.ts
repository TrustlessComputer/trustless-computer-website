import { ContractOperationHook, DAppType, DeployContractResponse } from '@/interfaces/contract-operation';
import ERC721ABIJson from '@/abis/erc721.json';
import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';
import { ContractFactory } from 'ethers';
import { BFS_ADDRESS } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import * as TC_SDK from 'trustless-computer-sdk';
import BigNumber from 'bignumber.js';
import { formatBTCPrice } from '@/utils/format';
import { TransactionEventType } from '@/enums/transaction';

export interface ICreateNFTCollectionParams {
  name: string;
  symbol: string;
}

const useCreateNFTCollection: ContractOperationHook<ICreateNFTCollectionParams, DeployContractResponse | null> = () => {
  const { account, provider } = useWeb3React();
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = async (params: ICreateNFTCollectionParams): Promise<DeployContractResponse | null> => {
    if (account && provider) {
      const { name, symbol } = params;
      const byteCode = ERC721ABIJson.bytecode;
      console.log({
        tcTxSizeByte: Buffer.byteLength(byteCode),
        feeRatePerByte: feeRate.fastestFee,
      });
      const estimatedFee = TC_SDK.estimateInscribeFee({
        // TODO remove hardcode
        tcTxSizeByte: 24000,
        feeRatePerByte: feeRate.fastestFee,
      });
      const balanceInBN = new BigNumber(btcBalance);
      if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
        throw Error(
          `Your balance is insufficient. Please top up at least ${formatBTCPrice(
            estimatedFee.totalFee.toString(),
          )} BTC to pay network fee.`,
        );
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
  };

  return {
    call: call,
    dAppType: DAppType.ERC721,
    transactionType: TransactionEventType.CREATE,
  };
};

export default useCreateNFTCollection;
