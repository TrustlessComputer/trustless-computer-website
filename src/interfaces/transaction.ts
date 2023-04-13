import { Transaction } from 'web3-eth';

export interface ICustomTransaction extends Transaction {
  Hex: string;
}

export interface ITransaction {
  createdAt: string;
  currency?: string;
  decimal?: number;
  deletedAt?: string;
  fromAddress: string;
  id: string;
  status: 'pending' | 'confirmed';
  time?: string | number;
  toAddress: string;
  txHash: string;
  txHashType: string;
  updatedAt?: string;
  value: string;
  walletAddress: string;
}
