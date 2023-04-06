export type ContractOperationHook<P, R> = () => {
  call: (p: P & IOperationRequiredParams) => Promise<R>;
};

export interface IOperationRequiredParams {
  gasPrice: number;
  nonce: number;
}
