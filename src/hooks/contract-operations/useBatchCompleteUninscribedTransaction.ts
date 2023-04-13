import { SupportedChainId } from '@/constants/chains';
import { WalletContext } from '@/contexts/wallet-context';
import { switchChain } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useContext, useState } from 'react';
import useBitcoin from '../useBitcoin';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import { AssetsContext } from '@/contexts/assets-context';
import { updateStatusTransaction } from '@/services/profile';
import { toast } from 'react-hot-toast';

interface IParams {
  chainId?: SupportedChainId;
}

const useBatchCompleteUninscribedTransaction = (args: IParams) => {
  const { chainId = SupportedChainId.TRUSTLESS_COMPUTER } = args;
  const { feeRate, getAvailableAssetsCreateTx } = useContext(AssetsContext);
  const { chainId: walletChainId, connector } = useWeb3React();
  const { onConnect: onConnectMetamask } = useContext(WalletContext);
  const user = useSelector(getUserSelector);
  const { createBatchInscribeTxs, getUnInscribedTransactionDetailByAddress } = useBitcoin();
  const [transactionConfirmed, setTransactionConfirmed] = useState(false);

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
      const unInscribedTxDetails = await getUnInscribedTransactionDetailByAddress(address);

      if (unInscribedTxDetails.length === 0) {
        throw Error('No pending transaction found.');
      }

      console.log('unInscribedTxDetails', unInscribedTxDetails);

      console.log('feeRatePerByte', feeRate.fastestFee);

      // Make inscribe transaction
      const res = await createBatchInscribeTxs({
        tcTxDetails: [...unInscribedTxDetails],
        feeRatePerByte: feeRate.fastestFee,
      });

      if (res && res.length > 0) {
        toast.success('Transaction completed successfully');
        const payloadUpdate = res.map(txs => {
          return {
            tx_hash: [...txs.tcTxIDs],
            btc_hash: txs.revealTxID,
            status: 'pending',
          };
        });

        updateStatusTransaction(payloadUpdate);
        setTransactionConfirmed(true);
        // console.log('updateConfirm', updateConfirm);
      }
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  return {
    run,
    transactionConfirmed,
  };
};

export default useBatchCompleteUninscribedTransaction;
