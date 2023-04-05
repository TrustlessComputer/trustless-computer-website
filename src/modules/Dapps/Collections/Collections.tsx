/* eslint-disable jsx-a11y/anchor-is-valid */
import { List, Spin } from 'antd';
import WrapImage from '@/components/WrapImage';
import { ICollection } from '@/models/collection';
import { shortenAddress } from '@/utils/helpers';
import { debounce } from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Container } from './Collections.styled';
import { getCollections } from '@/services/nft-explorer';

const LIMIT_PAGE = 32;

const Collections = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [collections, setCollections] = useState<ICollection[]>([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async (page = 1, isFetchMore = false) => {
    try {
      setIsFetching(true);
      const data = await getCollections(page, LIMIT_PAGE);
      if (isFetchMore) {
        setCollections(prev => [...prev, ...data]);
      } else {
        setCollections(data);
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  const onLoadMoreCollections = () => {
    if (isFetching || collections.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(collections.length / LIMIT_PAGE) + 1;
    fetchCollections(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreCollections, 300);

  return (
    <Container>
      <div className="content">
        <p className="title">Collections</p>
        <div>
          <InfiniteScroll
            className="list"
            dataLength={collections.length}
            hasMore={true}
            loader={isFetching && <Spin className="loading" />}
            next={debounceLoadMore}
          >
            {collections.length > 0 && (
              <List
                dataSource={collections}
                grid={{
                  gutter: 0,
                  xs: 1,
                  sm: 2,
                  md: 2,
                  lg: 3,
                  xl: 3,
                  xxl: 4,
                }}
                renderItem={(item: ICollection, index: number) => {
                  return (
                    <List.Item key={index.toString()} className="item">
                      <a className="card" href={`/dapps?tab=artifact&contract=${item.contract}`}>
                        <div className="card-content">
                          <div className="card-image">
                            <WrapImage alt={`thumb-${index.toString()}`} className="image" src={item.thumbnail} />
                          </div>
                          <div className="card-info">
                            <p className="card-title">{item.name}</p>
                            <p className="card-subTitle">{shortenAddress(item.creator, 4)}</p>
                          </div>
                        </div>
                      </a>
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

export default React.memo(Collections);
