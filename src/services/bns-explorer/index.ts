import { API_URL } from '@/configs';
import { IPagingParams } from '@/interfaces/api/query';
import { IBNS } from '@/interfaces/bns';
import { swrFetcher } from '@/utils/swr';

const API_PATH = '/bns-service/names';

export const getCollectionsBns = ({ limit = 12, page = 1 }): Promise<IBNS[]> =>
  swrFetcher(`${API_URL}${API_PATH}?limit=${limit}&page=${page}`, {
    method: 'GET',
  });

export const getBnsByWallet = ({
  limit = 12,
  page = 1,
  walletAddress = '',
}: {
  walletAddress: string;
} & IPagingParams): Promise<IBNS[]> =>
  swrFetcher(`${API_URL}${API_PATH}/owned/${walletAddress}?limit=${limit}&page=${page}`, {
    method: 'GET',
  });
