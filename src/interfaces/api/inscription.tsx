import { IMAGE_TYPE } from '@/components/NFTDisplayBox/constant';

export interface IInscription {
  id: string;
  collection: string;
  name: string;
  tokenId: string;
  tokenUri: string;
  attributes: [{ traitType: string; value: string }];
  metadataType: string;
  contentType: IMAGE_TYPE;
  createdAt: string;
  updatedAt: string;
  mintedAt: number;
  collectionAddress: string;
  owner: string;
  image?: string;
}
