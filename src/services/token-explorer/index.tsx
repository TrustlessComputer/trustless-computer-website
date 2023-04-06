import { API_URL } from '@/configs';
import { swrFetcher } from '@/utils/swr';

const API_PATH = '/token-explorer';

//TODO:  add type
export const getTokens = async (): Promise<any> =>
  swrFetcher(`${API_URL}${API_PATH}/tokens`, {
    method: 'GET',
    error: 'Fail to get tokens data',
  });
