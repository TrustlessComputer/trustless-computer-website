import { AxiosInstance } from 'axios';
import { createAxiosInstance } from '@/services';

class Client {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: '' });
  }
}

const client = new Client();

export default client;
