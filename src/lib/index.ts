// import { API_URL } from '@/configs';

export const getURLContent = (contractAddress: string, tokenId: string) => {
  return 'https://api-nft-explorer.trustless.computer/api/v1' + `/collection/${contractAddress}/nft/${tokenId}/content`;
};
