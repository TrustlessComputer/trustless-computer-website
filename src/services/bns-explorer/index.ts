import { API_URL } from '@/configs';
import { swrFetcher } from '@/utils/swr';
interface ICollection {
  name: string;
  tokenId: string;
  owner: string;
}
const API_PATH = '/bns-explorer';

export const getCollectionsBns = ({ limit = 12, page = 1 }): Promise<ICollection[]> =>
  swrFetcher(`${API_URL}${API_PATH}/bns?limit=${limit}&page=${page}`, {
    method: 'GET',
  });
