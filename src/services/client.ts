import { API_BASE_URL } from '@/utils/configs';
import { AxiosInstance } from 'axios';
import { createAxiosInstance } from '@/services';

class Client {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_BASE_URL });
  }
}

const client = new Client();

export default client;
