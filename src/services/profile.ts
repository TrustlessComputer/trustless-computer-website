import { IProfileResponse } from '@/interfaces/api/profile';
import { apiClient } from '.';
import { camelCaseKeys } from '@/utils/helpers';

const API_PATH = '/profile';

export const getCurrentProfile = async (): Promise<IProfileResponse> => {
  try {
    const res = await apiClient.get(`${API_PATH}/me`);
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    console.log(err);
    throw Error('Profile not found');
  }
};

export const updateStatusTransaction = async ({ txHash }: { txHash: string[] }): Promise<IProfileResponse> => {
  try {
    const res = await apiClient.put(`${API_PATH}/histories/confirm`, { txHash });
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    console.log(err);
    throw Error('Fail to update status transaction');
  }
};

export const createTransactionHistory = async (payload: {
  dapp_type: string;
  tx_hash: string;
}): Promise<IProfileResponse> => {
  try {
    const res = await apiClient.post(`${API_PATH}/histories`, payload);
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    console.log(err);
    throw Error('Fail to update status transaction');
  }
};
