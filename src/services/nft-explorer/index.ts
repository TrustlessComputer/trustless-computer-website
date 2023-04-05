import { API_BASE_URL } from './../../constants/config';
import axios from 'axios';
import { ICollection } from '@/models/collection';

const API_PATH = '/nft-explorer';

export const fetcher = (url: string) => axios.get(API_BASE_URL + url).then(res => res.data.data);

export const getCollections = (page: number, limit: number): Promise<ICollection[]> =>
  fetcher(`${API_PATH}/collections?limit=${limit}&page=${page}`);

// TODO: Add iterface for response
export const getCollectionDetail = ({ contractAddress, tokenID }: { contractAddress: string; tokenID: string }): any =>
  fetcher(`${API_PATH}/${contractAddress}/nfts/${tokenID}`);

// export const fetchBFSFiles = ({ address }: { address: string }): any => {
//   return fetcher(`${API_PATH}/files/${address}`);
// };
