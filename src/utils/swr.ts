/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { BareFetcher, unstable_serialize } from 'swr';
import { camelCaseKeys } from './helpers';

export const reorderKeys = (obj = {} as any) => {
  const newObj = {} as any;
  Object.keys(obj)
    .sort()
    .forEach(key => {
      newObj[key] = obj[key];
    });
  return newObj;
};

export const getApiKey = (fetcher: BareFetcher, params?: string | string[] | Record<string, unknown>): string => {
  return unstable_serialize([fetcher.name, typeof params === 'string' ? params : reorderKeys(params)]);
};

export const swrFetcher = async (url: string, options: any) => {
  console.log('🚀 ~ swrFetcher ~ url:', url);
  const { method, data, ...rest } = options;

  try {
    const response = await axios.request({ url, method, data, ...rest });
    return camelCaseKeys(response.data.data);
  } catch (error: any) {
    if (error.response) {
      const response = error?.response?.data || error;
      let errorMessage = response?.error || error?.Message || JSON.stringify(error);
      throw errorMessage;
    }
    throw new Error(error.config?.error || 'Something went wrong');
  }
};
