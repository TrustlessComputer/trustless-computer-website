import { API_URL } from '@/configs';
import { IPagingParams } from '@/interfaces/api/query';
import { swrFetcher } from '@/utils/swr';
interface ICollection {
  name: string;
  id: string;
  owner: string;
}
const API_PATH = '/bns-service/names';

export const getCollectionsBns = ({ limit = 12, page = 1 }): Promise<ICollection[]> =>
  swrFetcher(`${API_URL}${API_PATH}?limit=${limit}&page=${page}`, {
    method: 'GET',
  });

export const getBnsByWallet = ({
  limit = 12,
  page = 1,
  walletAddress,
}: {
  walletAddress: string;
} & IPagingParams): Promise<ICollection[]> =>
  swrFetcher(`${API_URL}${API_PATH}/owned/${walletAddress}?limit=${limit}&page=${page}`, {
    method: 'GET',
  });
