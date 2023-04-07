import { SupportedChainId } from '@/constants/chains';
import { WalletContext } from '@/contexts/wallet-context';
import { ContractOperationHook } from '@/interfaces/contract-operation';
import { switchChain } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';
import useBitcoin from '../useBitcoin';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import { AssetsContext } from '@/contexts/assets-context';

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
      await switchChain(connector, chainId);
    }
  };

  const run = async (params: P): Promise<R> => {
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

      if (!inscribeable) {
        // Make TC transaction
        const tx: any = await call({
          ...params,
        });

        console.log('tcTX', tx);
        return tx;
      }

      // Check unInscribed transactions
      const unInscribedTxIDs = await getUnInscribedTransactionByAddress(address);

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
      console.log(err);
      throw err;
    }
  };

  return {
    run,
  };
};

export default useContractOperation;
