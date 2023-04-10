import { ContractOperationHook } from '@/interfaces/contract-operation';
import { useContract } from '@/hooks/useContract';
import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import { Transaction } from 'ethers';
import { AssetsContext } from '@/contexts/assets-context';
import BigNumber from 'bignumber.js';
import * as TC_SDK from 'trustless-computer-sdk';

export interface IPreserveChunkParams {
  address: string;
  chunks: Buffer;
}

const usePreserveChunks: ContractOperationHook<IPreserveChunkParams, Promise<Transaction | null>> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(ARTIFACT_CONTRACT, ArtifactABIJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: IPreserveChunkParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        const { address, chunks } = params;
        console.log({
          tcTxSizeByte: Buffer.byteLength(chunks),
          feeRatePerByte: feeRate.fastestFee,
        });
        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: Buffer.byteLength(chunks),
          feeRatePerByte: feeRate.fastestFee,
        });
        const balanceInBN = new BigNumber(btcBalance);
        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error('Your balance is insufficient. Please top up BTC to pay network fee.');
        }
        const transaction = await contract.connect(provider.getSigner()).preserveChunks(address, [chunks]);

        return transaction;
      }

      return null;
    },
    [account, provider, contract],
  );

  return {
    call: call,
  };
};

export default usePreserveChunks;
