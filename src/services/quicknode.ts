import { IQuickNodeBalanceRes } from '@/interfaces/quicknode';
import { apiClient } from '.';

const API_PATH = '/quicknode';

export const getBtcBalance = async (btcWalletAddress: string): Promise<Array<IQuickNodeBalanceRes>> => {
  try {
    const res = await apiClient.get(`${API_PATH}/address/${btcWalletAddress}/balance`);
    return Object(res);
  } catch (err: unknown) {
    console.log(err);
    return [];
  }
};
