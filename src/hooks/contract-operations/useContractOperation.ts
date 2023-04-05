import { TC_NETWORK_RPC } from '@/configs';
import CustomWeb3Provider from '@/connection/custom-web3-provider';
import { SupportedChainId } from '@/constants/chains';
import { WalletContext } from '@/contexts/wallet-context';
import { XverseContext } from '@/contexts/xverse-context';
import { ContractOperationHook } from '@/interfaces/contract-operation';
import { switchChain } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';

interface IParams<P, R> {
  operation: ContractOperationHook<P, R>;
  chainId?: SupportedChainId;
}

interface IContractOperationReturn<P, R> {
  run: (p: P) => Promise<R>;
}

const useContractOperation = <P, R>(args: IParams<P, R>): IContractOperationReturn<P, R> => {
  const { operation, chainId = SupportedChainId.TRUSTLESS_COMPUTER } = args;
  const { call } = operation();
  const { account, chainId: walletChainId, connector } = useWeb3React();
  const { onConnect: onConnectMetamask } = useContext(WalletContext);
  const { onConnect: onConnectXverse, isConnected: isXverseConnected } = useContext(XverseContext);

  const connectWallet = async (): Promise<void> => {
    try {
      if (!account) {
        await onConnectMetamask();
      }
      if (!isXverseConnected) {
        await onConnectXverse();
      }
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

  const getTransactionHex = async (txHash: string): Promise<string | null> => {
    const web3 = new CustomWeb3Provider(TC_NETWORK_RPC);
    const tx = await web3.getTransaction(txHash);
    return tx.Hex;
  };

  const run = async (params: P): Promise<R> => {
    // This function does not handle error
    // It delegates error to caller

    // Connect Metamask & Xverse
    await connectWallet();

    // Check & switch network if necessary
    await checkAndSwitchChainIfNecessary();

    // Make TC transaction
    call(params);

    // Get transaction hex from TC transaction hash

    // Make inscribe transaction
    return {} as R;
  };

  return {
    run,
  };
};

export default useContractOperation;
