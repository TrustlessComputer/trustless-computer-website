import { API_URL } from '@/configs';
import axios from 'axios';

const API_PATH = '/bfs-service';

export const fetcher = (url: string) => axios.get(API_URL + url).then(res => res.data);

export const getCollections = () => fetcher(`/nft-explorer/collections`);

// export const fetchBFSFiles = ({ address }: { address: string }): any => {
//   return fetcher(`${API_PATH}/files/${address}`);
// };
