import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { Address, getAddress, GetAddressOptions } from 'sats-connect';
import isEmpty from 'lodash/isEmpty';
import { AddressPurposes } from 'sats-connect/dist/src/address/types';
import { removeXverseWallet, setXverseWallet } from '@/utils/xverse-wallet-storage';
import { XVERSE_DOWNLOAD_URL } from '@/constants/url';
import { IXverseWalletStorage } from '@/interfaces/xverse-wallet';

export interface IXverseContext {
  onConnect: () => Promise<IXverseWalletStorage>;
  onDisconnect: () => Promise<void>;
}

const initialValue: IXverseContext = {
  onDisconnect: () => new Promise<void>(() => null),
  onConnect: () =>
    new Promise<IXverseWalletStorage>(() => ({
      address: '',
      publicKey: '',
    })),
};

export const XverseContext = React.createContext<IXverseContext>(initialValue);

export const XverseProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const isInstalled = (): boolean => {
    const installed = window.BitcoinProvider;
    if (!installed) {
      removeXverseWallet();
      window.open(XVERSE_DOWNLOAD_URL, '_blank');
      return false;
    }
    return true;
  };

  const onConnect = useCallback(async () => {
    return new Promise<IXverseWalletStorage>((resolve, reject) => {
      try {
        const installed = isInstalled();
        if (!installed) reject('Xverse is not installed yet');
        const getAddressOptions = {
          payload: {
            purposes: ['ordinals'],
            message: 'Address for receiving Ordinals',
            network: {
              type: 'Mainnet',
            },
          },

          onFinish: (response: never) => {
            const accounts = response as { addresses: Address[] };
            if (!!accounts && !isEmpty(accounts.addresses)) {
              const account = accounts.addresses.find(_account => _account.purpose === AddressPurposes.ORDINALS);
              if (account) {
                setXverseWallet({
                  address: account.address,
                  publicKey: account.publicKey,
                });
                resolve({
                  address: account.address,
                  publicKey: account.publicKey,
                });
              }
            }
            reject('Xverse account not found');
          },

          onCancel: (err: unknown) => {
            console.log('reject to connect xverse');
            console.log(err);
            reject('User rejected to connect');
          },
        } as GetAddressOptions;

        getAddress(getAddressOptions);
      } catch (err: unknown) {
        console.log('failed to connect xverse');
        console.log(err);
      }
    });
  }, []);

  const onDisconnect = useCallback(async () => {
    removeXverseWallet();
  }, []);

  const contextValues = useMemo((): IXverseContext => {
    return {
      onConnect,
      onDisconnect,
    };
  }, [onConnect]);

  return <XverseContext.Provider value={contextValues}>{children}</XverseContext.Provider>;
};
