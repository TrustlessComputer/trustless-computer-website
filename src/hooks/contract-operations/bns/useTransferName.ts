import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import BNSABIJson from '@/abis/bns.json';
import { BNS_CONTRACT, TRANSFER_TX_SIZE } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import { Transaction } from 'ethers';
import * as TC_SDK from 'trustless-computer-sdk';
import { AssetsContext } from '@/contexts/assets-context';
import BigNumber from 'bignumber.js';
import { formatBTCPrice } from '@/utils/format';
import { stringToBuffer } from '@/utils';

export interface ITransferNameParams {
  to: string;
  name: string;
}

const useTransferName: ContractOperationHook<ITransferNameParams, Promise<Transaction | null>> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(BNS_CONTRACT, BNSABIJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: ITransferNameParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        const { to, name } = params;
        console.log({
          tcTxSizeByte: TRANSFER_TX_SIZE,
          feeRatePerByte: feeRate.fastestFee,
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

        const byteCode = stringToBuffer(name);

        // Map name to token ID
        const tokenId = await contract.connect(provider).registry(byteCode);

        // Transfer
        const transaction = await contract.connect(provider.getSigner()).safeTransferFrom(account, to, tokenId);
        return transaction;
      }

      return null;
    },
    [account, provider, contract, btcBalance, feeRate],
  );

  return {
    call,
    dAppType: DAppType.BNS,
  };
};

export default useTransferName;
