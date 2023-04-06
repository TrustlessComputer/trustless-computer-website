import { apiClient } from '.';

const API_PATH = '/quicknode';

const getBtcBalance = async (btcWalletAddress: string): Promise<number> => {
  try {
    const res = await apiClient.get(`${API_PATH}/address/${btcWalletAddress}/balance`);
    return 0;
  } catch (err: unknown) {
    console.log(err);
    return 0;
  }
};
