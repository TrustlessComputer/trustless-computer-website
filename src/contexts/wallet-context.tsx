import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '@/state/hooks';
import { resetUser, updateEVMWallet, updateSelectedWallet, updateTaprootWallet } from '@/state/user/reducer';
import { getConnection } from '@/connection';
import { generateBitcoinTaprootKey } from '@/utils/derive-key';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import bitcoinStorage from '@/utils/bitcoin-storage';
import { generateNonceMessage, verifyNonceMessage } from '@/services/auth';
import { getAccessToken, setAccessToken } from '@/utils/auth-storage';
import { clearAuthStorage } from '@/utils/auth-storage';
import Web3 from 'web3';
import { provider } from 'web3-core';
import { switchChain } from '@/utils';
import { SupportedChainId } from '@/constants/chains';
import { getCurrentProfile } from '@/services/profile';
import useAsyncEffect from 'use-async-effect';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/route-path';

export interface IWalletContext {
  onDisconnect: () => Promise<void>;
  onConnect: () => Promise<string | null>;
  generateBitcoinKey: (walletAddress: string) => Promise<string | null>;
}

const initialValue: IWalletContext = {
  onDisconnect: () => new Promise<void>(r => r()),
  onConnect: () => new Promise<null>(r => r(null)),
  generateBitcoinKey: (walletAddress: string) => new Promise<null>(r => r(null)),
};

export const WalletContext = React.createContext<IWalletContext>(initialValue);

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const { connector, provider, account, chainId } = useWeb3React();
  const dispatch = useAppDispatch();
  const user = useSelector(getUserSelector);
  const navigate = useNavigate();

  const disconnect = React.useCallback(async () => {
    console.log('disconnecting...');
    console.log('user', user);
    if (user?.walletAddress) {
      bitcoinStorage.removeUserTaprootAddress(user?.walletAddress);
    }
    if (connector && connector.deactivate) {
      await connector.deactivate();
    }
    await connector.resetState();
    clearAuthStorage();
    dispatch(resetUser());
    // TODO Clear localstorage
    localStorage.clear();
  }, [connector, dispatch, user]);

  const connect = React.useCallback(async () => {
    const connection = getConnection(connector);
    if (!connection) {
      throw new Error('Get connection error.');
    }
    await connection.connector.activate();
    if (chainId !== SupportedChainId.TRUSTLESS_COMPUTER) {
      await switchChain(SupportedChainId.TRUSTLESS_COMPUTER);
    }
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

  const generateBitcoinKey = React.useCallback(
    async (evmWalletAddress: string) => {
      if (evmWalletAddress) {
        const existedWallet = bitcoinStorage.getUserTaprootAddress(evmWalletAddress);
        if (existedWallet) {
          dispatch(updateTaprootWallet(existedWallet));
          return existedWallet;
        }
        const { address: taprootAddress } = await generateBitcoinTaprootKey(evmWalletAddress);
        if (taprootAddress) {
          dispatch(updateTaprootWallet(taprootAddress));
          return taprootAddress;
        }
      }
      return null;
    },
    [dispatch, account],
  );

  useEffect(() => {
    if (user?.walletAddress && !user.walletAddressBtcTaproot) {
      const taprootAddress = bitcoinStorage.getUserTaprootAddress(user?.walletAddress);
      if (!taprootAddress) return;
      dispatch(updateTaprootWallet(taprootAddress));
    }
  }, [user, dispatch]);

  useAsyncEffect(async () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      try {
        const connection = getConnection(connector);
        if (!connection) {
          throw new Error('Get connection error.');
        }
        await connection.connector.activate();
        if (chainId !== SupportedChainId.TRUSTLESS_COMPUTER) {
          await switchChain(SupportedChainId.TRUSTLESS_COMPUTER);
        }
        const { walletAddress } = await getCurrentProfile();
        dispatch(updateEVMWallet(walletAddress));
        dispatch(updateSelectedWallet({ wallet: 'METAMASK' }));
        await generateBitcoinKey(walletAddress);
      } catch (err: unknown) {
        clearAuthStorage();
        console.log(err);
      }
    }
  }, [dispatch, connector]);

  useEffect(() => {
    const handleAccountsChanged = async () => {
      console.log('accountsChanged');
      await disconnect();
      navigate(`${ROUTE_PATH.CONNECT_WALLET}?next=${ROUTE_PATH.HOME}`);
    };

    if (window.ethereum) {
      Object(window.ethereum).on('accountsChanged', handleAccountsChanged);
    }
  }, [disconnect]);

  const contextValues = useMemo((): IWalletContext => {
    return {
      onDisconnect: disconnect,
      onConnect: connect,
      generateBitcoinKey,
    };
  }, [disconnect, connect, generateBitcoinKey]);

  return <WalletContext.Provider value={contextValues}>{children}</WalletContext.Provider>;
};
