import { getCollectionsBns } from '@/services/bns-explorer';
import { getApiKey } from '@/utils/swr';
import { List, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import { Container } from './NamesList.styled';
import { shortenAddress } from '@/utils/address';

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
    setpageSize(pageSize + LIMIT_PAGE);
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
        <div>
          <InfiniteScroll
            className="list"
            dataLength={collection?.length || 0}
            hasMore={true}
            loader={isLoading && <Spin />}
            next={onLoadMoreNfts}
          >
            {collection && collection.length > 0 && (
              <List
                dataSource={collection}
                grid={{
                  gutter: 0,
                  xs: 1,
                  sm: 2,
                  md: 2,
                  lg: 3,
                  xl: 3,
                  xxl: 4,
                }}
                renderItem={(item: any, index: number) => {
                  return (
                    <List.Item key={index.toString()} className="item">
                      <div className="card">
                        <div className="card-content">
                          <div className="card-info">
                            <p className="card-title">{item.name}</p>
                            <p className="card-subTitle">{shortenAddress(item.owner, 4)}</p>
                            <p className="card-subTitle">Name #{item.tokenId}</p>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  );
                }}
              />
            )}
          </InfiniteScroll>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(NamesList);
