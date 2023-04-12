import React, { useEffect, useState } from 'react';
import { StyledTransactionProfile } from './TransactionsProfile.styled';
import Table from '@/components/Table';
import useBitcoin from '@/hooks/useBitcoin';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';

type Props = {};

const TransactionsProfile = (props: Props) => {
  const user = useSelector(getUserSelector);
  const { createInscribeTx, getUnInscribedTransactionByAddress } = useBitcoin();

  const [transactions, setTransactions] = useState<string[]>([]);

  const fetchTransactions = async () => {
    if (user && user.walletAddress) {
      try {
        const unInscribedTxIDs = await getUnInscribedTransactionByAddress(user.walletAddress);
        setTransactions(unInscribedTxIDs);
      } catch (err: unknown) {
        console.log('Fail to get transactions');
      }
    }
  };

  const TABLE_HEADINGS = ['Transaction ID', 'Status', ''];

  //   const transactionsData = []
  const transactionsData = transactions.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (token: any, index: number) => {
      //   const totalSupply = token?.totalSupply / decimalToExponential(token.decimal);
      //   const linkTokenExplorer = `${EXPLORER_URL}/token/${token?.address}`;
      //   const linkToOwnerExplorer = `${EXPLORER_URL}/address/${token?.owner}`;

      return {
        id: `token-${token?.address}}`,
        render: {
          tx_id: index + 1,
          //   symbol: token?.symbol || '-',
          status: <div className="status">Need to resume</div>,
        },
      };
    },
  );

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user]);

  return (
    <StyledTransactionProfile>
      <Table tableHead={TABLE_HEADINGS} data={[]} className={'token-table'} />
    </StyledTransactionProfile>
  );
};

export default TransactionsProfile;
