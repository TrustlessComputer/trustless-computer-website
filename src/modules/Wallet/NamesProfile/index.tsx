import { getBnsByWallet } from '@/services/bns-explorer';
import { shortenAddress } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Container } from './NameProfile.styled';
import { AnyIfEmpty } from 'react-redux';
import Empty from '@/components/Empty';

const LIMIT_PAGE = 12;

interface ICollection {
  name: string;
  id: string;
  owner: string;
}

const NamesProfile = () => {
  const { account } = useWeb3React();

  const profileWallet = account;
  const [pageSize, setpageSize] = useState(LIMIT_PAGE);
  const [isFetching, setIsFetching] = useState(false);
  const [collections, setCollections] = useState<any>();

  // const { data: collection, isLoading } = useSWR(
  //   getApiKey(getBnsByWallet, { limit: pageSize, page: page, walletAddress: profileWallet }),
  //   () => getBnsByWallet({ limit: pageSize, page: page, walletAddress: profileWallet }),
  // );

  const fetchNames = async (page = 1, isFetchMore = false) => {
    if (account && profileWallet) {
      try {
        setIsFetching(true);
        const data = await getBnsByWallet({ limit: pageSize, page: page, walletAddress: profileWallet });
        if (isFetchMore) {
          setCollections((prev: any) => [...prev, ...data]);
        } else {
          setCollections(data);
        }
      } catch (error) {
      } finally {
        setIsFetching(false);
      }
    }
  };

  const onLoadMoreNames = () => {
    if (isFetching || collections?.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(collections?.length / LIMIT_PAGE) + 1;
    fetchNames(page, true);
  };
  const debounceLoadMore = debounce(onLoadMoreNames, 300);

  useEffect(() => {
    if (account) {
      fetchNames();
    }
  }, [account]);

  if (!collections || collections.length === 0) return <Empty />;

  return (
    <Container>
      <div className="content">
        Test
        <InfiniteScroll
          className="list"
          dataLength={collections.length}
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
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              350: 1,
              750: 2,
              900: 3,
              1240: 4,
              2500: 5,
              3000: 5,
            }}
          >
            <Masonry gutter="16px">
              {collections &&
                collections.length > 0 &&
                collections.map((item: any, index: number) => {
                  return (
                    <div key={index.toString()} className="card">
                      <div className="card-content">
                        <div className="card-info">
                          <p className="card-title">{item.name}</p>
                          <p className="card-subTitle">{shortenAddress(item.owner, 4)}</p>
                          <p className="card-subTitle">Name #{item.id}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default NamesProfile;
