import { TransactionResponse } from '@ethersproject/abstract-provider';

export type ContractOperationHook<P, R> = (arg?: any) => {
  call: (args: P) => R;
};

export type DeployContractResponse = {
  hash: string;
  contractAddress: string;
  deployTransaction: TransactionResponse;
};
