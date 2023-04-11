import { API_URL } from '@/configs';
import { IPagingParams } from '@/interfaces/api/query';
import { swrFetcher } from '@/utils/swr';
import queryString from 'query-string';

const API_PATH = '/token-explorer';

//TODO:  add type
export const getTokens = async (
  params: {
    key?: string;
  } & IPagingParams,
): Promise<any> => {
  const qs = '?' + queryString.stringify(params);
  return swrFetcher(`${API_URL}${API_PATH}/tokens${qs}`, {
    method: 'GET',
    error: 'Fail to get tokens data',
  });
};
