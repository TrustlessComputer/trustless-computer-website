import { API_URL } from '@/configs';
import createAxiosInstance from './http-client';

// Can create multiple axios instances with different base URL
export const apiClient = createAxiosInstance({ baseURL: API_URL });
