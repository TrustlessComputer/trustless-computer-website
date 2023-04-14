import { SupportedChainId } from '@/constants/chains';
import { ContractOperationHook } from '@/interfaces/contract-operation';
import { capitalizeFirstLetter, switchChain } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';
import useBitcoin from '../useBitcoin';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
import { AssetsContext } from '@/contexts/assets-context';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/route-path';
import { createTransactionHistory } from '@/services/profile';
import moment from 'moment';
import { ICreateTransactionPayload } from '@/interfaces/transaction';

interface IParams<P, R> {
  operation: ContractOperationHook<P, R>;
  inscribeable?: boolean;
  chainId?: SupportedChainId;
}

interface IContractOperationReturn<P, R> {
  run: (p: P) => Promise<R>;
}

const useContractOperation = <P, R>(args: IParams<P, R>): IContractOperationReturn<P, R> => {
  const { operation, chainId = SupportedChainId.TRUSTLESS_COMPUTER, inscribeable = true } = args;
  const { call, dAppType, transactionType } = operation();
  const { feeRate } = useContext(AssetsContext);
  const { chainId: walletChainId } = useWeb3React();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const user = useSelector(getUserSelector);
  const { createInscribeTx, getUnInscribedTransactionByAddress } = useBitcoin();
  const navigate = useNavigate();

  const checkAndSwitchChainIfNecessary = async (): Promise<void> => {
    console.log('walletChainId', walletChainId);
    console.log('chainId', chainId);

    if (walletChainId !== chainId) {
      await switchChain(chainId);
    }
  };

  const run = async (params: P): Promise<R> => {
    try {
      // This function does not handle error
      // It delegates error to caller

      if (!isAuthenticated || !user?.walletAddress) {
        navigate(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
        throw Error('Please connect wallet to continue.');
      }

      // Check & switch network if necessary
      await checkAndSwitchChainIfNecessary();

      if (!inscribeable) {
        // Make TC transaction
        console.time('____metamaskCreateTxTime');
        const tx: R = await call({
          ...params,
        });
        console.timeEnd('____metamaskCreateTxTime');

        console.log('tcTX', tx);
        return tx;
      }

      // Check unInscribed transactions
      console.time('____unInscribedTxIDsLoadTime');
      const unInscribedTxIDs = await getUnInscribedTransactionByAddress(user.walletAddress);
      console.timeEnd('____unInscribedTxIDsLoadTime');

      if (unInscribedTxIDs.length > 0) {
        throw Error('You have some pending transactions. Please complete all of them before moving on.');
      }

      console.log('unInscribedTxIDs', unInscribedTxIDs);

      console.time('____metamaskCreateTxTime');
      const tx: R = await call({
        ...params,
      });
      console.timeEnd('____metamaskCreateTxTime');

      console.log('tcTX', tx);

      console.log('feeRatePerByte', feeRate.fastestFee);

      // Make inscribe transaction
      const { commitTxID, revealTxID } = await createInscribeTx({
        tcTxIDs: [...unInscribedTxIDs, Object(tx).hash],
        feeRatePerByte: feeRate.fastestFee,
      });

      const currentTimeString = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const transactionHistory: ICreateTransactionPayload = {
        dapp_type: `${transactionType} ${dAppType}`,
        tx_hash: Object(tx).hash,
        from_address: Object(tx).from,
        to_address: Object(tx).to,
        time: currentTimeString,
      };
      if (commitTxID && revealTxID) {
        transactionHistory.btc_tx_hash = revealTxID;
      }
      await createTransactionHistory(transactionHistory);

      return tx;
    } catch (err) {
      if (Object(err).reason) {
        throw Error(capitalizeFirstLetter(Object(err).reason));
      }
      throw err;
    }
  };

  return {
    run,
  };
};

export default useContractOperation;
