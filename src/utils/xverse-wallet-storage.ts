import { XVERSE_WALLET_ADDRESS } from '@/constants/storage-key';
import { XverseWallet } from '@/interfaces/xverse-wallet';
import sessionStorage from '@/utils/sessionstorage';

export const setXverseWallet = (payload: XverseWallet): void => {
  return sessionStorage.set(XVERSE_WALLET_ADDRESS, JSON.stringify(payload));
};

export const getXverseWallet = (): XverseWallet | null => {
  return sessionStorage.get<XverseWallet>(XVERSE_WALLET_ADDRESS);
};

export const removeXverseWallet = (): void => {
  return sessionStorage.remove(XVERSE_WALLET_ADDRESS);
};
