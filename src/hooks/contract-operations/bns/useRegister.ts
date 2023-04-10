import { ContractOperationHook } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import BNSABIJson from '@/abis/bns.json';
import { BNS_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import { stringToBuffer } from '@/utils';
import { Transaction } from 'ethers';
import * as TC_SDK from 'trustless-computer-sdk';
import { AssetsContext } from '@/contexts/assets-context';
import BigNumber from 'bignumber.js';

export interface IRegisterNameParams {
  name: string;
}

const useRegister: ContractOperationHook<IRegisterNameParams, Promise<Transaction | null>> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(BNS_CONTRACT, BNSABIJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: IRegisterNameParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        const { name } = params;
        const byteCode = stringToBuffer(name);
        console.log({
          tcTxSizeByte: Buffer.byteLength(byteCode),
          feeRatePerByte: feeRate.fastestFee,
        });
        const estimatedFee = TC_SDK.estimateInscribeFee({
          // TODO remove hardcode
          tcTxSizeByte: Buffer.byteLength(byteCode) + 1000,
          feeRatePerByte: feeRate.fastestFee,
        });
        const balanceInBN = new BigNumber(btcBalance);
        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error('Your balance is insufficient. Please top up BTC to pay network fee.');
        }
        const transaction = await contract.connect(provider.getSigner()).register(account, byteCode);
        return transaction;
      }

      return null;
    },
    [account, provider, contract, btcBalance, feeRate],
  );

  return {
    call,
  };
};

export default useRegister;
