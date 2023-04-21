import { API_FAUCET } from '@/configs';
import { IFaucetStatusResp, IEarnFaucetStatus } from '@/interfaces/api/faucet';
import { swrFetcher } from '@/utils/swr';

const API_PATH = API_FAUCET + '/faucet';

export const requestFaucet = (linkTweet: string, tokenCapcha: string, address: string): Promise<string> =>
  swrFetcher(`${API_PATH}/request`, {
    method: 'POST',
    data: { url: linkTweet, 'g-recaptcha-response': tokenCapcha, address },
  });

export const requestGetFaucetStatus = (address: string): Promise<IFaucetStatusResp[]> => {
  return swrFetcher(`${API_PATH}/list?address=${address}`, {
    method: 'GET',
  });
};

export const requestGetEarnStatus = (address: string): Promise<IEarnFaucetStatus> => {
  return swrFetcher(`${API_PATH}/status?address=${address}`, {
    method: 'GET',
  });
};
