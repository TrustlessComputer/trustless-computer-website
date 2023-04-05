import { WalletContext } from '@/contexts/wallet-context';
import { XverseContext } from '@/contexts/xverse-context';
import { useContext } from 'react';

const useConnectWallet = () => {
  const { onConnect: onConnectMetamask } = useContext(WalletContext);
  const { onConnect: onConnectXverse } = useContext(XverseContext);

  const handleConnectWallet = async (): Promise<void> => {
    try {
      await onConnectMetamask();
      await onConnectXverse();
    } catch (err: unknown) {
      console.log(err);
    }
  };
};

export default useConnectWallet();
