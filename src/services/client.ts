import { API_URL } from '@/configs';
import { AxiosInstance } from 'axios';
import { createAxiosInstance } from '@/services';

class Client {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_URL });
  }
}

const client = new Client();

export default client;
