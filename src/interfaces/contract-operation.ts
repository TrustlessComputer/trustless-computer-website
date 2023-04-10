import { TransactionResponse } from '@ethersproject/abstract-provider';

export type ContractOperationHook<P, R> = () => {
  call: (args: P) => R;
};

export type DeployContractResponse = {
  hash: string;
  contractAddress: string;
  deployTransaction: TransactionResponse;
};
