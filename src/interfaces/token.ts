export interface IToken {
  id: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt?: string;
  address: string;
  totalSupply: string;
  owner: string;
  deployedAtBlock: number;
  slug: string;
  symbol: string;
  name: string;
  thumbnail?: string;
  description?: string;
  social?: {
    website?: string;
    discord?: string;
    twitter?: string;
    telegram?: string;
    medium?: string;
    instagram?: string;
  };
  index: number;
  balance: string;
  decimal: number;
}
