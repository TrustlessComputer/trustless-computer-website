export interface ICollection {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  slug: string;
  contract: string;
  createdAt: string;
  updatedAt: string;
  totalItems: number;
  totalOwners: number;
  cover: string;
  index: number;
  deployedAtBlock: number;
  indexed: boolean;
  indexedAt: string;
  creator: string;
  social: {
    website?: string;
    discord?: string;
    twitter?: string;
  };
}
