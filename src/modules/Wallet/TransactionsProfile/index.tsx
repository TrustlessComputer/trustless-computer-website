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
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'lodash';
import { Spinner } from 'react-bootstrap';
import { ITransaction } from '@/interfaces/transaction';

type Props = {
  pendingList: string[];
};

enum TransactionStatus {
  PENDING = 'processing',
  CONFIRMED = 'confirmed',
  RESUME = 'pending',
}

type TTransaction = {
  txHashType: string;
  txHash: string;
  status: string;
};

const LIMIT_PAGE = 200;

const TransactionsProfile = ({ pendingList }: Props) => {
  const TABLE_HEADINGS = ['Type', 'Transaction ID', 'Status'];

  const user = useSelector(getUserSelector);

  const { transactionConfirmed } = useBatchCompleteUninscribedTransaction({});

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [procressTx, setProcressTx] = useState<ITransaction[]>();

  const [isFetching, setIsFetching] = useState(false);

  const fetchTransactionHistory = async (page = 1, isFetchMore = false) => {
    if (user && user.walletAddress) {
      try {
        setIsFetching(true);
        const res = await getTransactionsByWallet({ walletAddress: user.walletAddress, limit: LIMIT_PAGE, page: page });

        const txHashes = res.map(tx => tx.txHash);

        // filter pendingList not in txHashes
        const pendingListNotInTxHashes = pendingList.filter(txHash => !txHashes.includes(txHash));

        for (const txHash of pendingListNotInTxHashes) {
          await createTransactionHistory({ dapp_type: '-', tx_hash: txHash });
        }

        if (isFetchMore) {
          setTransactions(prev => [...prev, ...res]);
        } else {
          setTransactions(res);
        }

        const processTxs = res.filter((tx: any) => tx.status === TransactionStatus.PENDING);

        setProcressTx(processTxs);
      } catch (error) {
        console.log('Fail to get transactions');
      } finally {
        setIsFetching(false);
      }
    }
  };

  const fetchTransactionStatus = async (tx: string) => {
    if (user && user.walletAddress) {
      try {
        const tcClient = new TC_SDK.TcClient(TC_SDK.Mainnet, TC_NETWORK_RPC);
        const res = await tcClient.getTCTxByHash(tx);
        if (res && res.blockHash) {
          await updateStatusTransaction({ txHash: [tx] });
        }
      } catch (error) {
        console.log(`Fail to update transactions ${tx}`);
      }
    }
  };

  const transactionsData = transactions?.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trans => {
      const keyStatus = trans.status.toUpperCase();

      const status: string = pendingList.includes(trans.txHash)
        ? TransactionStatus.RESUME
        : TransactionStatus[keyStatus as keyof typeof TransactionStatus];

      return {
        id: trans.id,
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
    if (procressTx && procressTx.length > 0) {
      for (const tx of procressTx) {
        fetchTransactionStatus(tx.txHash);
      }
    }
  }, [procressTx]);

  const onLoadMoreTransactions = () => {
    if (isFetching || transactions.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(transactions.length / LIMIT_PAGE) + 1;
    fetchTransactionHistory(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreTransactions, 300);

  return (
    <StyledTransactionProfile>
      <InfiniteScroll
        className="transactions"
        dataLength={transactions?.length || 0}
        hasMore={true}
        loader={
          isFetching && (
            <div className="loading">
              <Spinner animation="border" variant="primary" />
            </div>
          )
        }
        next={debounceLoadMore}
      >
        <Table tableHead={TABLE_HEADINGS} data={transactionsData} className={'transaction-table'} />
      </InfiniteScroll>
    </StyledTransactionProfile>
  );
};

export default TransactionsProfile;
