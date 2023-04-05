import { AxiosInstance } from 'axios';
import { createAxiosInstance } from '@/services';
import { API_FAUCET } from '@/configs';

class Client {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_FAUCET });
  }

  requestFaucet(linkTweet: string, tokenCapcha: string): Promise<string> {
    return this.http.post('/faucet/request', { url: linkTweet, 'g-recaptcha-response': tokenCapcha });
  }
}

const faucetClient = new Client();

export default faucetClient;
