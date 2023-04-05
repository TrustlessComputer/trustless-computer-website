import { XVERSE_WALLET_ADDRESS } from '@/constants/storage-key';
import { IXVerseWalletStorage } from '@/interfaces/xverse-wallet';
import sessionStorage from '@/utils/session-storage';

export const setXVerseWallet = (payload: IXVerseWalletStorage): void => {
  return sessionStorage.set(XVERSE_WALLET_ADDRESS, JSON.stringify(payload));
};

export const getXVerseWallet = (): IXVerseWalletStorage | null => {
  return sessionStorage.get<IXVerseWalletStorage>(XVERSE_WALLET_ADDRESS);
};

export const removeXVerseWallet = (): void => {
  return sessionStorage.remove(XVERSE_WALLET_ADDRESS);
};
