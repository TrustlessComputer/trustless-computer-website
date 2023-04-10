import { ContractOperationHook, DeployContractResponse } from '@/interfaces/contract-operation';
import ERC20ABIJson from '@/abis/erc20.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import { ContractFactory } from 'ethers';
import { AssetsContext } from '@/contexts/assets-context';
import * as TC_SDK from 'trustless-computer-sdk';
import BigNumber from 'bignumber.js';

export interface ICreateTokenParams {
  name: string;
  symbol: string;
  maxSupply: number;
}

const useCreateToken: ContractOperationHook<ICreateTokenParams, Promise<DeployContractResponse | null>> = () => {
  const { account, provider } = useWeb3React();
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: ICreateTokenParams): Promise<DeployContractResponse | null> => {
      if (account && provider) {
        const { name, symbol, maxSupply } = params;

        const byteCode = ERC20ABIJson.bytecode;
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

        const factory = new ContractFactory(ERC20ABIJson.abi, ERC20ABIJson.bytecode, provider.getSigner());
        const contract = await factory.deploy(name, symbol, maxSupply);

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
