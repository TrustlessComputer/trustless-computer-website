import Empty from '@/components/Empty';
import Table from '@/components/Table';
import { TRUSTLESS_COMPUTER_CHAIN_INFO } from '@/constants/chains';
import { getTokensWallet } from '@/services/profile';
import { getUserSelector } from '@/state/user/selector';
import { decimalToExponential } from '@/utils/format';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { StyledTokenProfile } from './TokenProfile.styled';
import TransferModal from './TransferModal';

const EXPLORER_URL = TRUSTLESS_COMPUTER_CHAIN_INFO.explorers[0].url;

const LIMIT_PAGE = 12;

const TokensProfile = () => {
  const user = useSelector(getUserSelector);

  const profileWallet = user?.walletAddress || '';
  const [isFetching, setIsFetching] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [tokensList, setTokensList] = useState<any>([]);

  const TABLE_HEADINGS = ['#', 'Name', 'Symbol', 'Balance', 'Max Supply', ''];

  // const { data, error, isLoading } = useSWR(getApiKey(getTokensByWallet, { key: profileWallet }), () =>
  //   getTokensByWallet({ key: profileWallet }),
  // );
  const hanldeOpenTransferModal = (selectedToken: any) => {
    setShowTransferModal(true);
    setSelectedToken(selectedToken);
  };

  const hanldeCloseTransferModal = () => {
    setShowTransferModal(false);
    setSelectedToken(null);
  };

  const fetchTokensOwned = async (page = 1, isFetchMore = false) => {
    try {
      setIsFetching(true);
      const res = await getTokensWallet({ walletAddress: profileWallet, limit: 12, page: page });
      if (isFetchMore) {
        setTokensList((prev: any) => [...prev, ...res]);
      } else {
        setTokensList(res);
      }
    } catch (err: unknown) {
      console.log('Failed to fetch tokens owned');
    } finally {
      setIsFetching(false);
    }
  };

  const tokenDatas = tokensList.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (token: any, index: number) => {
      const totalSupply = token?.totalSupply / decimalToExponential(token.decimal);
      const balance = token?.balance / decimalToExponential(token.decimal);
      const linkTokenExplorer = `${EXPLORER_URL}/token/${token?.address}`;

      return {
        id: `token-${token?.address}}`,
        render: {
          number: index + 1,
          name: (
            <a href={linkTokenExplorer} rel="rel=”noopener noreferrer”" target="_blank">
              {token?.name || '-'}
            </a>
          ),

          symbol: token?.symbol || '-',
          balance: balance.toLocaleString(),
          supply: totalSupply.toLocaleString(),
          action: (
            <>
              {balance > 0 && (
                <div className="owner-actions">
                  <button onClick={() => hanldeOpenTransferModal(token)} className="transfer-button">
                    Transfer
                  </button>
                </div>
              )}
            </>
          ),
        },
      };
    },
  );

  const onLoadMoreTokens = () => {
    if (isFetching || tokensList.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(tokensList.length / LIMIT_PAGE) + 1;
    fetchTokensOwned(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreTokens, 300);

  useEffect(() => {
    if (user && user.walletAddress) fetchTokensOwned();
  }, [user]);

  if (!tokensList || tokensList.length === 0 || !profileWallet) {
    return <Empty />;
  }

  return (
    <StyledTokenProfile>
      {isFetching ? (
        <div className="loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <InfiniteScroll
          className="transactions"
          dataLength={tokensList?.length || 0}
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
          <Table tableHead={TABLE_HEADINGS} data={tokenDatas} className={'token-table'} />
        </InfiniteScroll>
      )}
      <TransferModal
        show={showTransferModal}
        handleClose={hanldeCloseTransferModal}
        erc20TokenAddress={selectedToken?.address}
      />
    </StyledTokenProfile>
  );
};

export default TokensProfile;
