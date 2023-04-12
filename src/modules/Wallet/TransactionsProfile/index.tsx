import IcCopy from '@/assets/icons/ic-copy.svg';
import Table from '@/components/Table';
import { createTransactionHistory, getTransactionsByWallet, updateStatusTransaction } from '@/services/profile';
import { getUserSelector } from '@/state/user/selector';
import { formatLongAddress } from '@/utils';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledTransactionProfile } from './TransactionsProfile.styled';
import { toast } from 'react-hot-toast';
import useBatchCompleteUninscribedTransaction from '@/hooks/contract-operations/useBatchCompleteUninscribedTransaction';
import * as TC_SDK from 'trustless-computer-sdk';
import { TC_NETWORK_RPC } from '@/configs';
import useAsyncEffect from 'use-async-effect';

type Props = {
  pendingList: string[];
};

enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  RESUME = 'resume',
}

type TTransaction = {
  txHashType: string;
  txHash: string;
  status: string;
};

const TransactionsProfile = ({ pendingList }: Props) => {
  const TABLE_HEADINGS = ['Type', 'Transaction ID', 'Status'];

  const user = useSelector(getUserSelector);

  const { transactionConfirmed } = useBatchCompleteUninscribedTransaction({});

  const [transactions, setTransactions] = useState<any>();

  const fetchTransactionHistory = async () => {
    if (user && user.walletAddress) {
      try {
        const res = await getTransactionsByWallet({ walletAddress: user.walletAddress });

        const txHashes = res.map((tx: any) => tx.txHash);

        // filter pendingList not in txHashes
        const pendingListNotInTxHashes = pendingList.filter(txHash => !txHashes.includes(txHash));
        for (const txHash of pendingListNotInTxHashes) {
          await createTransactionHistory({ dapp_type: 'Transfer', tx_hash: txHash });
        }

        const listNotInTxHashes = pendingListNotInTxHashes.map(txHash => ({
          txHashType: '-',
          txHash,
          status: TransactionStatus.RESUME,
        }));

        setTransactions([...res, ...listNotInTxHashes]);
      } catch (error) {
        console.log('Fail to get transactions');
      }
    }
  };

  const fetchTransactionStatus = async (tx: string) => {
    if (user && user.walletAddress) {
      try {
        // const res = await getTransactionsByWallet({ walletAddress: user.walletAddress });
        const tcClient = new TC_SDK.TcClient(TC_SDK.Mainnet, TC_NETWORK_RPC);
        const res = await tcClient.getTCTxByHash(tx);
        if (res && res.blockHash) {
          await updateStatusTransaction({ txHash: [tx] });
        }
      } catch (error) {
        console.log('Fail to get transactions');
      }
    }
  };

  const transactionsData = transactions?.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (trans: any, index: number) => {
      const status: string = pendingList.includes(trans.txHash) ? TransactionStatus.RESUME : trans.status;

      return {
        id: trans,
        render: {
          type: trans.txHashType,
          tx_id: (
            <div className="tx-wrapper">
              <div className={`tx-id`}>{trans.txHash}</div>
              <div
                className="icCopy"
                onClick={() => {
                  copy(trans.txHash);
                  toast.success('Copied');
                }}
              >
                <img alt="ic-copy" src={IcCopy}></img>
              </div>
            </div>
          ),
          status: <div className={`status ${status} `}>{status}</div>,
        },
      };
    },
  );

  useEffect(() => {
    if (user) fetchTransactionHistory();
  }, [user, transactionConfirmed]);

  useEffect(() => {
    setTimeout(() => {
      if (transactions && transactions.length > 0)
        transactions.map((tx: any) => {
          if (tx.status === TransactionStatus.PENDING) {
            fetchTransactionStatus(tx.txHash);
          }
        });
    }, 3000);
  }, []);

  useAsyncEffect(async () => {
    if (transactions && transactions.length > 0) {
    }
  }, [transactions]);

  return (
    <StyledTransactionProfile>
      <Table tableHead={TABLE_HEADINGS} data={transactionsData} className={'transaction-table'} />
    </StyledTransactionProfile>
  );
};

export default TransactionsProfile;
