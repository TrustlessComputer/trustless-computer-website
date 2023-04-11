import { SupportedChainId } from '@/constants/chains';
import { WalletContext } from '@/contexts/wallet-context';
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
  const { call } = operation();
  const { feeRate, getAvailableAssetsCreateTx } = useContext(AssetsContext);
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
      const assets = await getAvailableAssetsCreateTx();
      console.log('assets', assets);
      if (!assets) {
        throw Error('Can not get assets. Please try again.');
      }

      if (!inscribeable) {
        // Make TC transaction
        const tx: any = await call({
          ...params,
        });

        console.log('tcTX', tx);
        return tx;
      }

      // Check unInscribed transactions
      const unInscribedTxIDs = await getUnInscribedTransactionByAddress(user.walletAddress);

      if (unInscribedTxIDs.length > 0) {
        throw Error('You have some pending transactions. Please complete all of them before moving on.');
      }

      console.log('unInscribedTxIDs', unInscribedTxIDs);

      const tx: any = await call({
        ...params,
      });

      console.log('tcTX', tx);

      console.log('feeRatePerByte', feeRate.fastestFee);

      // Make inscribe transaction
      await createInscribeTx({
        tcTxIDs: [...unInscribedTxIDs, tx.hash],
        feeRatePerByte: feeRate.fastestFee,
      });

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
