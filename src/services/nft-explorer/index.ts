import { API_BASE_URL } from './../../constants/config';
import axios from 'axios';

const API_PATH = '/collections';

export const fetcher = (url: string) => axios.get(API_BASE_URL + url).then(res => res.data);

export const getCollections = () => fetcher(API_PATH);

// TODO: Add iterface for response
export const getCollectionDetail = ({ contractAddress, tokenID }: { contractAddress: string; tokenID: string }): any =>
  fetcher(`${API_PATH}/${contractAddress}/nfts/${tokenID}`);

// export const fetchBFSFiles = ({ address }: { address: string }): any => {
//   return fetcher(`${API_PATH}/files/${address}`);
// };
