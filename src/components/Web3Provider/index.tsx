import { Web3ReactProvider } from '@web3-react/core';
import React, { ReactNode } from 'react';
import connectors from '@/connectors';
import useEagerlyConnect from '@/hooks/useEagerlyConnect';

const Web3Provider = ({ children }: { children: ReactNode }) => {
  useEagerlyConnect();
  return (
    <Web3ReactProvider connectors={connectors} key="provider">
      {children}
    </Web3ReactProvider>
  );
};

export default Web3Provider;
