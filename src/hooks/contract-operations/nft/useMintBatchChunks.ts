import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import ERC721ABIJson from '@/abis/erc721.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import { Transaction } from 'ethers';
import { AssetsContext } from '@/contexts/assets-context';
import BigNumber from 'bignumber.js';
import * as TC_SDK from 'trustless-computer-sdk';
import { formatBTCPrice } from '@/utils/format';
import { getContract } from '@/utils';
import { TransactionEventType } from '@/enums/transaction';

export interface IMintBatchChunksParams {
  listOfChunks: Array<Buffer>;
  contractAddress: string;
}

const useMintBatchChunks: ContractOperationHook<IMintBatchChunksParams, Transaction | null> = () => {
  const { account, provider } = useWeb3React();
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: IMintBatchChunksParams): Promise<Transaction | null> => {
      const { listOfChunks, contractAddress } = params;
      console.log('useMintBatchChunks', params);
      if (account && provider && contractAddress) {
        const contract = getContract(contractAddress, ERC721ABIJson.abi, provider, account);
        const tcTxSizeByte = listOfChunks.reduce((prev, cur) => prev + Buffer.byteLength(cur), 0);
        console.log({
          tcTxSizeByte: tcTxSizeByte,
          feeRatePerByte: feeRate.fastestFee,
          contractAddress,
        });
        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: tcTxSizeByte,
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

        const chunks = listOfChunks.map(item => [item]);
        const transaction = await contract.connect(provider.getSigner()).mintBatchChunks(account, chunks);
        return transaction;
      }

      return null;
    },
    [account, provider, btcBalance, feeRate],
  );

  return {
    call: call,
    dAppType: DAppType.ERC721,
    transactionType: TransactionEventType.MINT,
  };
};

export default useMintBatchChunks;
