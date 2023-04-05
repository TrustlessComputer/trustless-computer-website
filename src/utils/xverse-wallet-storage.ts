import { XVERSE_WALLET_ADDRESS } from '@/constants/storage-key';
import { IXverseWalletStorage } from '@/interfaces/xverse-wallet';
import sessionStorage from '@/utils/sessionstorage';

export const setXverseWallet = (payload: IXverseWalletStorage): void => {
  return sessionStorage.set(XVERSE_WALLET_ADDRESS, JSON.stringify(payload));
};

export const getXverseWallet = (): IXverseWalletStorage | null => {
  return sessionStorage.get<IXverseWalletStorage>(XVERSE_WALLET_ADDRESS);
};

export const removeXverseWallet = (): void => {
  return sessionStorage.remove(XVERSE_WALLET_ADDRESS);
};
