import { Transaction } from 'web3-eth';

export interface ICustomTransaction extends Transaction {
  Hex: string;
}
