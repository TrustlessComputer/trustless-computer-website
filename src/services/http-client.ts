import { getAccessToken } from '@/utils/auth-storage';
import axios from 'axios';
import { config } from 'process';

const TIMEOUT = 5 * 60000;

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
    config => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    res => {
      const result = res?.data?.data || res?.data?.result;
      const error = res?.data?.error;
      if (error) {
        return Promise.reject(error);
      }
      return Promise.resolve(result);
    },
    (error: any) => {
      if (!error.response) {
        return Promise.reject(error);
      } else {
        const response = error?.response?.data || error;
        let errorMessage = response?.error || error?.Message || JSON.stringify(error);
        return Promise.reject(errorMessage);
      }
    },
  );

  return instance;
};

export default createAxiosInstance;
