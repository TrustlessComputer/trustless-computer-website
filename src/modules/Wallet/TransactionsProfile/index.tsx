import React, { useEffect, useState } from 'react';
import { StyledTransactionProfile } from './TransactionsProfile.styled';
import Table from '@/components/Table';
import useBitcoin from '@/hooks/useBitcoin';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import useCompleteUninscribedTransaction from '@/hooks/contract-operations/useCompleteUninscribedTransaction';

type Props = {
  transactionList: string[];
};

const TransactionsProfile = ({ transactionList }: Props) => {
  const TABLE_HEADINGS = ['Transaction ID', 'Status', ''];

  //   const transactionsData = []
  const transactionsData = transactionList.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (trans: any, index: number) => {
      return {
        id: trans,
        render: {
          tx_id: trans,
          status: <div className="status">Need to resume</div>,
        },
      };
    },
  );

  return (
    <StyledTransactionProfile>
      <Table tableHead={TABLE_HEADINGS} data={[]} className={'token-table'} />
    </StyledTransactionProfile>
  );
};

export default TransactionsProfile;
