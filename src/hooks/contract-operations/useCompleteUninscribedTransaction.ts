import { SupportedChainId } from '@/constants/chains';
import { WalletContext } from '@/contexts/wallet-context';
import { switchChain } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';
import useBitcoin from '../useBitcoin';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import { AssetsContext } from '@/contexts/assets-context';
import { updateStatusTransaction } from '@/services/profile';

interface IParams {
  chainId?: SupportedChainId;
}

const useCompleteUninscribedTransaction = (args: IParams) => {
  const { chainId = SupportedChainId.TRUSTLESS_COMPUTER } = args;
  const { feeRate, getAvailableAssetsCreateTx } = useContext(AssetsContext);
  const { chainId: walletChainId, connector } = useWeb3React();
  const { onConnect: onConnectMetamask } = useContext(WalletContext);
  const user = useSelector(getUserSelector);
  const { createInscribeTx, getUnInscribedTransactionByAddress } = useBitcoin();

  const connectWallet = async () => {
    try {
      if (!user?.walletAddress) {
        return await onConnectMetamask();
      }
      return user.walletAddress;
    } catch (err: unknown) {
      console.log(err);
      throw Error('Failed to connect wallet');
    }
  };

  const checkAndSwitchChainIfNecessary = async (): Promise<void> => {
    if (walletChainId !== chainId) {
      await switchChain(chainId);
    }
  };

  const run = async (): Promise<void> => {
    try {
      // This function does not handle error
      // It delegates error to caller

      // Connect Metamask & Xverse
      const address = await connectWallet();
      if (!address) {
        throw Error('Wallet address not found');
      }

      // Check & switch network if necessary
      await checkAndSwitchChainIfNecessary();
      const assets = await getAvailableAssetsCreateTx();

      console.log(assets);

      // Check unInscribed transactions
      const unInscribedTxIDs = await getUnInscribedTransactionByAddress(address);

      if (unInscribedTxIDs.length === 0) {
        throw Error('No pending transaction found.');
      }

      console.log('unInscribedTxIDs', unInscribedTxIDs);

      console.log('feeRatePerByte', feeRate.fastestFee);

      // Make inscribe transaction
      await createInscribeTx({
        tcTxIDs: [...unInscribedTxIDs],
        feeRatePerByte: feeRate.fastestFee,
      });

      // if (commitTxID && revealTxID) {
      //   await updateStatusTransaction({ txHash: [...unInscribedTxIDs] });
      // }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {
    run,
  };
};

export default useCompleteUninscribedTransaction;
