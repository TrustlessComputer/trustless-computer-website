import { API_BASE_URL } from '@/utils/configs';

export const getURLContent = (contractAddress: string, tokenId: string) => {
  return API_BASE_URL + `/collection/${contractAddress}/nft/${tokenId}/content`;
};