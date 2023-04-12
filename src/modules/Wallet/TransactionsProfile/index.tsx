import Table from '@/components/Table';
import { StyledTransactionProfile } from './TransactionsProfile.styled';

type Props = {
  transactionList: string[];
};

const TransactionsProfile = ({ transactionList }: Props) => {
  const TABLE_HEADINGS = ['Transaction ID', 'Status', ''];

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
      <Table tableHead={TABLE_HEADINGS} data={transactionsData} className={'transaction-table'} />
    </StyledTransactionProfile>
  );
};

export default TransactionsProfile;
