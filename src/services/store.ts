import { IDappStore, ICreateDappStorePayload } from '@/interfaces/api/store';
import { apiClient } from '.';

const API_PATH = '/dapp-info';

export const getListDappStore = async (): Promise<Array<IDappStore>> => {
  try {
    const res = await apiClient.get(`${API_PATH}/list`);
    return Object(res);
  } catch (err: unknown) {
    console.log(err);
    return [];
  }
};

export const createDappStore = async (payload: ICreateDappStorePayload): Promise<any> => {
  try {
    const res = await apiClient.post(`${API_PATH}/create`, payload);
    return res;
  } catch (err: unknown) {
    console.log(err);
    throw Error('Failed to submit a Bitcoin dapp');
  }
};
