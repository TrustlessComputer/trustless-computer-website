import { apiClient } from '@/services';
import {
  BINANCE_PAIR,
  FeeRateName,
  ICollectedUTXOResp,
  IFeeRate,
  IPendingUTXO,
  ITokenPriceResp,
} from '@/interfaces/api/bitcoin';
import BigNumber from 'bignumber.js';

export const BINANCE_API_URL = 'https://api.binance.com/api/v3';

// Collected UTXO
export const getCollectedUTXO = async (btcAddress: string): Promise<ICollectedUTXOResp | undefined> => {
  try {
    const res = await apiClient.get<ICollectedUTXOResp>(`/wallets/${btcAddress}`);
    return res as any;
  } catch (err) {
    console.log(err);
  }
};

export const getPendingUTXOs = async (btcAddress: string): Promise<IPendingUTXO[]> => {
  let pendingUTXOs = [];
  if (!btcAddress) return [];
  try {
    const res = await apiClient.get(`https://blockstream.info/api/address/${btcAddress}/txs`);
    pendingUTXOs = (res.data || []).filter((item: IPendingUTXO) => !item.status.confirmed);
  } catch (err) {
    return [];
  }
  return pendingUTXOs;
};

export const getFeeRate = async (): Promise<IFeeRate> => {
  try {
    const res = await fetch('https://mempool.space/api/v1/fees/recommended');
    const fee: IFeeRate = await res.json();
    if (fee[FeeRateName.fastestFee] <= 10) {
      return {
        [FeeRateName.fastestFee]: 15,
        [FeeRateName.halfHourFee]: 10,
        [FeeRateName.hourFee]: 5,
      };
    }
    return fee;
  } catch (err: unknown) {
    console.log(err);
    return {
      [FeeRateName.fastestFee]: 25,
      [FeeRateName.halfHourFee]: 20,
      [FeeRateName.hourFee]: 15,
    };
  }
};

export const getTokenRate = async (pair: BINANCE_PAIR = 'ETHBTC'): Promise<number> => {
  try {
    const res = await fetch(`${BINANCE_API_URL}/ticker/price?symbol=${pair}`);
    const data: ITokenPriceResp = await res.json();
    const rate = data?.price;
    return new BigNumber(rate).toNumber();
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
};
