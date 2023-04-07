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
  const { feeRate } = useContext(AssetsContext);
  const { chainId: walletChainId, connector } = useWeb3React();
  const { onConnect: onConnectMetamask } = useContext(WalletContext);
  const user = useSelector(getUserSelector);
  const { getNonceInscribeable, createInscribeTx } = useBitcoin();

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

  // const getTransactionHex = async (txHash: string): Promise<string | null> => {
  //   const web3 = new CustomWeb3Provider(TC_NETWORK_RPC);
  //   const tx = await web3.getTransaction(txHash);
  //   return tx.Hex;
  // };

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

      const { nonce, gasPrice } = await getNonceInscribeable(address);

      console.log('nonce', nonce);
      console.log('gasPrice', gasPrice);

      // Make TC transaction
      const tx: any = await call({
        ...params,
        nonce,
        gasPrice,
      });

      console.log('tcTX', tx);

      if (!inscribeable) {
        return tx;
      }

      console.log('createInscribeTxParams', {
        tcTxID: tx.hash,
        feeRatePerByte: feeRate.fastestFee,
      });

      // Make inscribe transaction
      await createInscribeTx({
        tcTxID: tx.hash,
        feeRatePerByte: feeRate.fastestFee,
      });

      return {} as R;
    } catch (err) {
      console.log(err);
      return {} as R;
    }
  };

  return {
    run,
  };
};

export default useContractOperation;
