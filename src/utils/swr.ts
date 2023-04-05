/* eslint-disable @typescript-eslint/no-explicit-any */
import { BareFetcher, unstable_serialize } from 'swr';

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
