import { API_URL } from '@/configs';

export const getURLContent = (contractAddress: string, tokenId: string) => {
  return API_URL + `/nft-explorer/collections/${contractAddress}/nfts/${tokenId}/content`;
};
