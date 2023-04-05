import { API_BASE_URL } from './../../constants/config';
import axios from 'axios';

const API_PATH = '/collections';

export const fetcher = (url: string) => axios.get(API_BASE_URL + url).then(res => res.data);

export const getCollections = () => fetcher(API_PATH);

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
