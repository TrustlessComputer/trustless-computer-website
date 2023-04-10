import { getCollectionsBns } from '@/services/bns-explorer';
import { shortenAddress } from '@/utils/address';
import { getApiKey } from '@/utils/swr';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import useSWR from 'swr';
import { Container } from './NamesList.styled';

const LIMIT_PAGE = 32;

const NamesList = () => {
  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(LIMIT_PAGE);
  const [isFetching, setIsFetching] = useState(false);

  const { data: collection, isLoading } = useSWR(getApiKey(getCollectionsBns, { limit: pageSize, page: page }), () =>
    getCollectionsBns({ limit: pageSize, page: page }),
  );

  const debounceLoadMore = debounce(nextPage => {
    setpage(nextPage);
    // setpageSize(pageSize + LIMIT_PAGE);
  }, 300);

  const onLoadMoreNfts = () => {
    if (isFetching || (collection && collection.length % LIMIT_PAGE !== 0)) return;
    if (collection) {
      const nextPage = Math.floor(collection?.length / LIMIT_PAGE) + 1;
      debounceLoadMore(nextPage);
    }
  };

  return (
    <Container>
      <div className="content">
        <InfiniteScroll
          className="list"
          dataLength={collection?.length || 0}
          hasMore={true}
          loader={
            isLoading && (
              <div className="loading">
                <Spinner animation="border" variant="primary" />
              </div>
            )
          }
          next={onLoadMoreNfts}
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
              {collection &&
                collection.length > 0 &&
                collection.map((item, index) => {
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

export default React.memo(NamesList);
