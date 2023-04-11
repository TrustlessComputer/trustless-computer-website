import { API_URL } from '@/configs';
import { IPagingParams } from '@/interfaces/api/query';
import { ICollection } from '@/models/collection';
import { IInscription } from '@/models/inscription';
import { swrFetcher } from '@/utils/swr';

const API_PATH = API_URL + '/nft-explorer';

export const getCollections = (page: number, limit: number, isShowAll: boolean, owner = ''): Promise<ICollection[]> =>
  swrFetcher(`${API_PATH}/collections?limit=${limit}&page=${page}&allow_empty=${isShowAll}&owner=${owner}`, {
    method: 'GET',
  });

export const getCollectionByWallet = (
  page: number,
  limit: number,
  isShowAll: boolean,
  walletAddress: string,
): Promise<ICollection[]> =>
  swrFetcher(`${API_PATH}/collections/${walletAddress}?limit=${limit}&page=${page}&allow_empty=${isShowAll}`, {
    method: 'GET',
  });

// TODO: Add iterface for response
export const getCollectionDetail = ({ contractAddress }: { contractAddress: string }): Promise<ICollection> =>
  swrFetcher(`${API_PATH}/collections/${contractAddress}`, {
    method: 'GET',
  });

// TODO: Add iterface for response
export const getCollectionNfts = ({
  contractAddress,
  limit = 10,
  page = 1,
  owner = '',
}: {
  contractAddress: string;
  limit?: number;
  page?: number;
  owner?: string;
}): Promise<IInscription[]> =>
  swrFetcher(`${API_PATH}/collections/${contractAddress}/nfts?limit=${limit}&page=${page}&owner=${owner}`, {
    method: 'GET',
  });

export const getNFTDetail = ({
  contractAddress,
  tokenId,
}: {
  contractAddress: string;
  tokenId: string;
}): Promise<IInscription> =>
  swrFetcher(`${API_PATH}/collections/${contractAddress}/nfts/${tokenId}`, {
    method: 'GET',
  });

// export const fetchBFSFiles = ({ address }: { address: string }): any => {
//   return fetcher(`${API_PATH}/files/${address}`);
// };

export const getNFTsByWalletAddress = ({
  page,
  limit,
  walletAddress,
}: {
  walletAddress: string;
} & IPagingParams): Promise<any> =>
  swrFetcher(`${API_PATH}/owner-address/${walletAddress}/nfts?limit=${limit}&page=${page}`, {
    method: 'GET',
    error: 'Failed to get NFTs by wallet address',
  });
