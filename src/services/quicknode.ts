import { apiClient } from '.';

const API_PATH = '/quicknode';

export const getBtcBalance = async (btcWalletAddress: string): Promise<number> => {
  try {
    const res = await apiClient.get(`${API_PATH}/address/${btcWalletAddress}/balance`);
    return Object(res)[0].value;
  } catch (err: unknown) {
    console.log(err);
    return 0;
  }
};
