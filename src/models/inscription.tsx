import { IMAGE_TYPE } from 'lib/components/NFTDisplayBox/constant';

export interface IInscription {
  id: string;
  collection: string;
  name: string;
  tokenId: string;
  metadata: {
    description: string;
    name: string;
    attributes: [{ traitType: string; value: string }];
  };
  metadataType: string;
  contentType: IMAGE_TYPE;
  createdAt: string;
  updatedAt: string;
  collectionAddress: string;
  owner: string;
}
