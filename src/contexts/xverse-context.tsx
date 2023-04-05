import React, { PropsWithChildren, useMemo } from 'react';
import { Address, getAddress, GetAddressOptions } from 'sats-connect';
import isEmpty from 'lodash/isEmpty';
import { AddressPurposes } from 'sats-connect/dist/src/address/types';
import { removeXVerseWallet, setXVerseWallet } from '@/utils/xverse-wallet-storage';

export interface IXVerseContext {
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
}

const initialValue: IXVerseContext = {
  onConnect: () => new Promise<void>(() => null),
  onDisconnect: () => new Promise<void>(() => null),
};

export const XVerseContext = React.createContext<IXVerseContext>(initialValue);

export const XVerseProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const isInstalled = (): boolean => {
    const installed = window.BitcoinProvider;
    if (!installed) {
      removeXVerseWallet();
      window.open('https://www.xverse.app/download', '_blank');
      return false;
    }
    return true;
  };

  const onConnect = async () => {
    try {
      const installed = isInstalled();
      if (!installed) return;
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
              setXVerseWallet({
                address: account.address,
                publicKey: account.publicKey,
              });
            }
          }
        },

        onCancel: (err: unknown) => {
          console.log('reject to connect xverse');
          console.log(err);
        },
      } as GetAddressOptions;

      await getAddress(getAddressOptions);
    } catch (e) {
      console.log('failed to connect xverse');
    }
  };

  const onDisconnect = async () => {
    removeXVerseWallet();
  };

  const contextValues = useMemo((): IXVerseContext => {
    return {
      onConnect,
      onDisconnect,
    };
  }, [onConnect]);

  return <XVerseContext.Provider value={contextValues}>{children}</XVerseContext.Provider>;
};
