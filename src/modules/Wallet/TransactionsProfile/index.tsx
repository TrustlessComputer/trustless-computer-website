import IcCopy from '@/assets/icons/ic-copy.svg';
import Table from '@/components/Table';
import Text from '@/components/Text';
import { TC_NETWORK_RPC } from '@/configs';
import useBatchCompleteUninscribedTransaction from '@/hooks/contract-operations/useBatchCompleteUninscribedTransaction';
import { ITransaction } from '@/interfaces/transaction';
import { createTransactionHistory, getTransactionsByWallet, updateStatusTransaction } from '@/services/profile';
import { getUserSelector } from '@/state/user/selector';
import { formatLongAddress } from '@/utils';
import copy from 'copy-to-clipboard';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import * as TC_SDK from 'trustless-computer-sdk';
import { StyledTransactionProfile } from './TransactionsProfile.styled';
import moment from 'moment';

type Props = {
  pendingList: string[];
};

export enum TransactionStatus {
  PENDING = 'processing',
  CONFIRMED = 'confirmed',
}

const LIMIT_PAGE = 200;

const TransactionsProfile = ({ pendingList }: Props) => {
  const TABLE_HEADINGS = ['Event', 'Transaction ID', 'From', 'To', 'Date & Time', 'Status'];

  const user = useSelector(getUserSelector);

  const { transactionConfirmed } = useBatchCompleteUninscribedTransaction({});

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [procressTx, setProcressTx] = useState<ITransaction[]>();

  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactionHistory = async (page = 1, isFetchMore = false) => {
    if (user && user.walletAddress) {
      try {
        setIsFetching(true);
        const res = await getTransactionsByWallet({
          walletAddress: user.walletAddress,
          limit: LIMIT_PAGE,
          page: page,
        });

        const txHashes = res.map(tx => tx.txHash);

        // filter pendingList not in txHashes
        const pendingListNotInTxHashes = pendingList.filter(txHash => !txHashes.includes(txHash));

        for (const txHash of pendingListNotInTxHashes) {
          await createTransactionHistory({ dapp_type: 'Others', tx_hash: txHash });
        }

        if (isFetchMore) {
          setTransactions(prev => [...prev, ...res]);
        } else {
          setTransactions(res);
        }

        const processTxs = res.filter(tx => tx.status === 'pending');

        setProcressTx(processTxs);
      } catch (error) {
        console.log('Fail to get transactions');
      } finally {
        setIsFetching(false);
        setIsLoading(false);
      }
    }
  };

  const fetchTransactionStatus = async (tx: string) => {
    if (user && user.walletAddress) {
      try {
        setIsLoading(true);
        const tcClient = new TC_SDK.TcClient(TC_SDK.Mainnet, TC_NETWORK_RPC);
        const res = await tcClient.getTCTxByHash(tx);
        if (res && res.blockHash) {
          await updateStatusTransaction([{ tx_hash: [tx], status: TransactionStatus.CONFIRMED }]);
          // in transactions list, update status of tx to confirmed
          const newTransactions = transactions.map(tran => {
            if (tran.txHash === tx) {
              return { ...tran, status: TransactionStatus.CONFIRMED };
            }
            return tran;
          });
          setTransactions(newTransactions);
        }
      } catch (error) {
        console.log(`Fail to update transactions ${tx}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const transactionsData = transactions?.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trans => {
      const keyStatus = trans.status.toUpperCase();

      const linkToMempool = `https://mempool.space/tx/${trans?.btcTxHash || ''}`;

      const localDateString = trans?.time ? moment(trans?.time).local().format('YYYY-MM-DD HH:mm:ss') : '-';

      const status: string = pendingList.includes(trans.txHash)
        ? 'pending'
        : TransactionStatus[keyStatus as keyof typeof TransactionStatus];

      return {
        id: trans.id,
        render: {
          type: <div className="text-capitilize">{trans.txHashType}</div>,
          tx_id: (
            <div className="id-wrapper">
              <div className="tx-wrapper">
                <div className={`tx-id`}>{formatLongAddress(trans.txHash)}</div>
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
              {trans?.btcTxHash ? (
                <Text color="bg4" size="regular">
                  BTC:{' '}
                  <a className="tx-link" target="_blank" href={linkToMempool}>
                    {formatLongAddress(trans?.btcTxHash)}
                  </a>
                </Text>
              ) : (
                <div></div>
              )}
            </div>
          ),
          fromAddress: formatLongAddress(trans?.fromAddress) || '-',
          toAddress: formatLongAddress(trans?.toAddress) || '-',
          time: localDateString,
          status: <div className={`status ${status}`}>{status}</div>,
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
        <Table
          tableHead={TABLE_HEADINGS}
          data={transactionsData}
          className={'transaction-table'}
          isLoading={isLoading}
        />
      </InfiniteScroll>
    </StyledTransactionProfile>
  );
};

export default TransactionsProfile;
