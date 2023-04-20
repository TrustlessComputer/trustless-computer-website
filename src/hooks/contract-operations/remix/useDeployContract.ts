import { ContractOperationHook, DAppType, DeployContractResponse } from '@/interfaces/contract-operation';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useContext } from 'react';
import { AssetsContext } from '@/contexts/assets-context';
import { TransactionEventType } from '@/enums/transaction';
// import { solidityCompiler } from '@agnostico/browser-solidity-compiler';
import { ContractFactory } from 'ethers';

export interface IDeployContractParams {
  abi: any;
  bytecode: any;
  args: Array<any>;
}

const useDeployContract: ContractOperationHook<IDeployContractParams, DeployContractResponse | null> = () => {
  const { account, provider } = useWeb3React();
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: IDeployContractParams): Promise<DeployContractResponse | null> => {
      if (account && provider) {
        const { abi, bytecode, args } = params;
        // soljson-v0.8.19+commit.7dd6d404.js
        // https://binaries.soliditylang.org/bin/list.js
        // const output = (await solidityCompiler({
        //   version: `https://binaries.soliditylang.org/bin/${version}`,
        //   contractBody: content,
        // })) as any;
        //
        // const abi = output?.contracts?.Compiled_Contracts?.C.abi;
        // const bytecode = output?.contracts?.Compiled_Contracts?.C.evm.bytecode.object;

        const factory = new ContractFactory(abi, bytecode, provider.getSigner());
        const contract = await factory.deploy(args);
        return {
          hash: contract.deployTransaction.hash,
          contractAddress: contract.address,
          deployTransaction: contract.deployTransaction,
        };
      }

      return null;
    },
    [account, provider, btcBalance, feeRate],
  );

  return {
    call: call,
    dAppType: DAppType.Deploy,
    transactionType: TransactionEventType.DEPLOY,
  };
};

export default useDeployContract;
