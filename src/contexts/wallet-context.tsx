import React, { PropsWithChildren, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '@/state/hooks';
import { updateSelectedWallet } from '@/state/user/reducer';
import { getConnection } from '@/connection';

export interface IWalletContext {
  onDisconnect: () => void;
  onConnect: () => Promise<void>;
}

const initialValue: IWalletContext = {
  onDisconnect: () => undefined,
  onConnect: () => new Promise<void>(r => r()),
};

export const WalletContext = React.createContext<IWalletContext>(initialValue);

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const { connector } = useWeb3React();
  const dispatch = useAppDispatch();

  const disconnect = React.useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate();
    }
    connector.resetState();
    dispatch(updateSelectedWallet({ wallet: undefined }));
  }, [connector, dispatch]);

  const connect = React.useCallback(async () => {
    const connection = getConnection(connector);
    if (!connection) {
      throw new Error('Get connection error.');
    }
    await connection.connector.activate();
    dispatch(updateSelectedWallet({ wallet: connection.type }));
  }, [dispatch, connector]);

  const contextValues = useMemo((): IWalletContext => {
    return {
      onDisconnect: disconnect,
      onConnect: connect,
    };
  }, [disconnect, connect, connector]);

  return <WalletContext.Provider value={contextValues}>{children}</WalletContext.Provider>;
};
