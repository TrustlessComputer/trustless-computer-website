import Empty from '@/components/Empty';
import Table from '@/components/Table';
import { TRUSTLESS_COMPUTER_CHAIN_INFO } from '@/constants/chains';
import { getTokensByWallet } from '@/services/token-explorer';
import { decimalToExponential } from '@/utils/format';
import { getApiKey } from '@/utils/swr';
import { useWeb3React } from '@web3-react/core';
import { Spinner } from 'react-bootstrap';
import useSWR from 'swr';
import { StyledTokenProfile } from './TokenProfile.styled';
import { getTokensWallet } from '@/services/profile';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';

const EXPLORER_URL = TRUSTLESS_COMPUTER_CHAIN_INFO.explorers[0].url;

const LIMIT_PAGE = 12;

const TokensProfile = () => {
  const user = useSelector(getUserSelector);

  const profileWallet = user?.walletAddress || '';
  const [isFetching, setIsFetching] = useState(false);
  const [tokensList, setTokensList] = useState<any>([]);

  const TABLE_HEADINGS = ['Token number', 'Name', 'Symbol', 'Supply', ''];

  // const { data, error, isLoading } = useSWR(getApiKey(getTokensByWallet, { key: profileWallet }), () =>
  //   getTokensByWallet({ key: profileWallet }),
  // );

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
    }
  };

  const tokenDatas = tokensList.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (token: any, index: number) => {
      const totalSupply = token?.totalSupply / decimalToExponential(token.decimal);
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
          supply: totalSupply.toLocaleString(),
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
    </StyledTokenProfile>
  );
};

export default TokensProfile;
