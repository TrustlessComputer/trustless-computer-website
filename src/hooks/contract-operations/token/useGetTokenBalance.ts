import { ContractOperationHook, DAppType, DeployContractResponse } from '@/interfaces/contract-operation';
import ERC20ABIJson from '@/abis/erc20.json';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import { ContractFactory } from 'ethers';
import { AssetsContext } from '@/contexts/assets-context';
import * as TC_SDK from 'trustless-computer-sdk';
import BigNumber from 'bignumber.js';
import { formatBTCPrice } from '@/utils/format';
import { TransactionEventType } from '@/enums/transaction';
import { getContract } from '@/utils';

export interface IGetTokenBalance {
  erc20TokenAddress: string;
}

const useGetTokenBalance: ContractOperationHook<IGetTokenBalance, string> = () => {
  const { account, provider } = useWeb3React();
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: IGetTokenBalance): Promise<string> => {
      if (account && provider) {
        const { erc20TokenAddress } = params;
        const contract = getContract(erc20TokenAddress, ERC20ABIJson.abi, provider, account);

        const balance = await contract.connect(provider).balanceOf(account);

        return balance.toString();
      }

      return '0';
    },
    [account, provider, btcBalance, feeRate],
  );

  return {
    call: call,
    dAppType: DAppType.ERC20,
    transactionType: TransactionEventType.NONE,
  };
};

export default useGetTokenBalance;
