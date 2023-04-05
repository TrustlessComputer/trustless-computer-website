export type ContractOperationHook<P, R> = () => {
  call: (p: P) => Promise<R>;
};
