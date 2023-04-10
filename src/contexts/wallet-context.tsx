import React, { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '@/state/hooks';
import { resetUser, updateEVMWallet, updateSelectedWallet, updateTaprootWallet } from '@/state/user/reducer';
import { getConnection } from '@/connection';
import { generateBitcoinTaprootKey } from '@/utils/derive-key';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import bitcoinStorage from '@/utils/bitcoin-storage';
import { generateNonceMessage, verifyNonceMessage } from '@/services/auth';
import { setAccessToken } from '@/utils/auth-storage';
import useAsyncEffect from 'use-async-effect';
import { getAccessToken } from '@/utils/auth-storage';
import { clearAuthStorage } from '@/utils/auth-storage';
import Web3 from 'web3';
import { provider } from 'web3-core';

export interface IWalletContext {
  onDisconnect: () => void;
  onConnect: () => Promise<string | null>;
  generateBitcoinKey: () => Promise<string | null>;
}

const initialValue: IWalletContext = {
  onDisconnect: () => undefined,
  onConnect: () => new Promise<null>(r => r(null)),
  generateBitcoinKey: () => new Promise<null>(r => r(null)),
};

export const WalletContext = React.createContext<IWalletContext>(initialValue);

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const { connector, provider, account } = useWeb3React();
  const dispatch = useAppDispatch();
  const user = useSelector(getUserSelector);

  const disconnect = React.useCallback(() => {
    console.log('disconnecting...');
    if (connector && connector.deactivate) {
      connector.deactivate();
    }
    if (user?.walletAddress) {
      bitcoinStorage.removeUserTaprootAddress(user?.walletAddress);
    }
    connector.resetState();
    clearAuthStorage();
    dispatch(resetUser());
  }, [connector, dispatch, account]);

  const connect = React.useCallback(async () => {
    const connection = getConnection(connector);
    if (!connection) {
      throw new Error('Get connection error.');
    }
    await connection.connector.activate();
    const addresses = await connector.provider?.request({
      method: 'eth_accounts',
    });
    if (addresses && Array.isArray(addresses)) {
      const evmWalletAddress = addresses[0];
      const data = await generateNonceMessage({
        address: evmWalletAddress,
      });
      if (data) {
        const web3Provider = new Web3(window.ethereum as provider);
        const signature = await web3Provider.eth.personal.sign(Web3.utils.fromUtf8(data), evmWalletAddress, '');
        const { token: accessToken, refreshToken } = await verifyNonceMessage({
          address: evmWalletAddress,
          signature: signature,
        });
        console.log('signature', signature);
        setAccessToken(accessToken, refreshToken);
        dispatch(updateEVMWallet(evmWalletAddress));
        dispatch(updateSelectedWallet({ wallet: connection.type }));
        return evmWalletAddress;
      }
    }
    return null;
  }, [dispatch, connector, provider]);

  const generateBitcoinKey = React.useCallback(async () => {
    const addresses = await connector.provider?.request({
      method: 'eth_accounts',
    });
    if (addresses && Array.isArray(addresses)) {
      const evmWalletAddress = addresses[0];
      const { address: taprootAddress } = await generateBitcoinTaprootKey(evmWalletAddress);
      if (taprootAddress) {
        dispatch(updateTaprootWallet(taprootAddress));
        return taprootAddress;
      }
    }
    return null;
  }, [dispatch, connector]);

  useEffect(() => {
    Object(window.ethereum)?.on('disconnect', disconnect);
  }, [window]);

  useEffect(() => {
    if (user?.walletAddress && !user.walletAddressBtcTaproot) {
      const taprootAddress = bitcoinStorage.getUserTaprootAddress(user?.walletAddress);
      if (!taprootAddress) return;
      dispatch(updateTaprootWallet(taprootAddress));
    }
  }, [user, generateBitcoinKey]);

  const contextValues = useMemo((): IWalletContext => {
    return {
      onDisconnect: disconnect,
      onConnect: connect,
      generateBitcoinKey,
    };
  }, [disconnect, connect, generateBitcoinKey]);

  return <WalletContext.Provider value={contextValues}>{children}</WalletContext.Provider>;
};
