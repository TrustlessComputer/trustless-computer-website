import axios from 'axios';
import { camelCaseKeys } from '@/utils';

const TIMEOUT = 60000;

const HEADERS = { 'Content-Type': 'application/json' };

const createAxiosInstance = ({ baseURL = '' }: { baseURL: string }) => {
  const instance = axios.create({
    baseURL,
    timeout: TIMEOUT,
    headers: {
      ...HEADERS,
    },
  });

  instance.interceptors.request.use(
    req => req,
    error => {
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    res => {
      const result = res?.data?.data || res?.data?.result;
      const error = res?.data?.error;
      if (error) {
        return Promise.reject(camelCaseKeys(error));
      }
      return Promise.resolve(camelCaseKeys(result));
    },
    (error: any) => {
      if (!error.response) {
        return Promise.reject(error);
      } else {
        const response = error?.response?.data || error;
        let errorMessage = response?.error || error?.Message || JSON.stringify(error);
        return Promise.reject(camelCaseKeys(errorMessage));
      }
    },
  );

  return instance;
};

export default createAxiosInstance;
