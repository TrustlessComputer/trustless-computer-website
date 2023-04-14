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
import { TRANSFER_TX_SIZE } from '@/configs';
import { TransactionEventType } from '@/enums/transaction';

export interface ITransferERC721TokenParams {
  to: string;
  tokenId: string;
  contractAddress: string;
}

const useTransferERC721Token: ContractOperationHook<ITransferERC721TokenParams, Transaction | null> = () => {
  const { account, provider } = useWeb3React();
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: ITransferERC721TokenParams): Promise<Transaction | null> => {
      const { to, tokenId, contractAddress } = params;
      if (account && provider && contractAddress) {
        const contract = getContract(contractAddress, ERC721ABIJson.abi, provider, account);
        console.log({
          tcTxSizeByte: TRANSFER_TX_SIZE,
          feeRatePerByte: feeRate.fastestFee,
          contractAddress,
        });
        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: TRANSFER_TX_SIZE,
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

        const transaction = await contract.connect(provider.getSigner()).transferFrom(account, to, tokenId);

        return transaction;
      }

      return null;
    },
    [account, provider, btcBalance, feeRate],
  );

  return {
    call: call,
    dAppType: DAppType.ERC721,
    transactionType: TransactionEventType.TRANSFER,
  };
};

export default useTransferERC721Token;
