import { TransactionResponse } from '@ethersproject/abstract-provider';

export enum DAppType {
  ERC721 = 'ERC721', // NFTs
  ERC20 = 'ERC20', // Tokens
  BFS = 'BFS', // Artifactx
  BNS = 'BNS', // Name
}

export type ContractOperationHook<P, R> = (arg?: any) => {
  call: (args: P) => Promise<R>;
  dAppType: DAppType;
};

export type DeployContractResponse = {
  hash: string;
  contractAddress: string;
  deployTransaction: TransactionResponse;
};
