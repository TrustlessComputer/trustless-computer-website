import { AxiosInstance } from 'axios';
import { API_FAUCET } from '@/configs';
import createAxiosInstance from './http-client';

class Client {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_FAUCET });
  }

  requestFaucet(linkTweet: string, tokenCapcha: string, address: string): Promise<string> {
    return this.http.post('/faucet/request', { url: linkTweet, 'g-recaptcha-response': tokenCapcha, address });
  }
}

const faucetClient = new Client();

export default faucetClient;
