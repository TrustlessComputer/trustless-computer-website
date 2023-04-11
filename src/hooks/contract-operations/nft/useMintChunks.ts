import { ContractOperationHook } from '@/interfaces/contract-operation';
import ERC721ABIJson from '@/abis/erc721.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import { Transaction } from 'ethers';
import { AssetsContext } from '@/contexts/assets-context';
import BigNumber from 'bignumber.js';
import * as TC_SDK from 'trustless-computer-sdk';
import { formatBTCPrice } from '@/utils/format';
import { getContract } from '@/utils';

export interface IMintChunksParams {
  chunks: Buffer;
  contractAddress: string;
}

const useMintChunks: ContractOperationHook<IMintChunksParams, Promise<Transaction | null>> = () => {
  const { account, provider } = useWeb3React();
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: IMintChunksParams): Promise<Transaction | null> => {
      const { chunks, contractAddress } = params;
      if (account && provider && contractAddress) {
        const contract = getContract(contractAddress, ERC721ABIJson.abi, provider, account);
        console.log({
          tcTxSizeByte: Buffer.byteLength(chunks),
          feeRatePerByte: feeRate.fastestFee,
          contractAddress,
        });
        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: Buffer.byteLength(chunks),
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
        const transaction = await contract.connect(provider.getSigner()).mintChunks(account, [chunks]);

        return transaction;
      }

      return null;
    },
    [account, provider, btcBalance, feeRate],
  );

  return {
    call: call,
  };
};

export default useMintChunks;
