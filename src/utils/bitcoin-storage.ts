import { TAPROOT_ADDRESS } from '@/constants/storage-key';
import localStorage from '@/utils/localstorage';

class BitCoinStorage {
  private getUserTaprootKey = (evmAddress: string) => {
    return `${TAPROOT_ADDRESS}-${evmAddress.toLowerCase()}`;
  };

  getUserTaprootAddress = (evmAddress: string): string | null => {
    const key = this.getUserTaprootKey(evmAddress);
    return localStorage.get<string | null>(key);
  };

  setUserTaprootAddress = (evmAddress: string, taprootAddress: string) => {
    const key = this.getUserTaprootKey(evmAddress);
    return localStorage.set(key, taprootAddress);
  };

  removeUserTaprootAddress = (evmAddress: string) => {
    const key = this.getUserTaprootKey(evmAddress);
    return localStorage.remove(key);
  };
}

const instance = new BitCoinStorage();

export default instance;
