import { API_URL } from '@/configs';
import axios from 'axios';
import { ICollection } from '@/models/collection';

const API_PATH = '/nft-explorer';

export const fetcher = (url: string) => axios.get(API_URL + url).then(res => res.data.data);

export const getCollections = (page: number, limit: number): Promise<ICollection[]> =>
  fetcher(`${API_PATH}/collections?limit=${limit}&page=${page}`);

// TODO: Add iterface for response
export const getCollectionDetail = ({ contractAddress }: { contractAddress: string }): any =>
  fetcher(`${API_PATH}/${contractAddress}}`);

// TODO: Add iterface for response
export const getCollectionNfts = ({
  contractAddress,
  limit = 10,
  page = 1,
}: {
  contractAddress: string;
  limit?: number;
  page?: number;
}): any => fetcher(`${API_PATH}/${contractAddress}/nfts?limit=${limit}&page=${page}`);

// export const fetchBFSFiles = ({ address }: { address: string }): any => {
//   return fetcher(`${API_PATH}/files/${address}`);
// };
