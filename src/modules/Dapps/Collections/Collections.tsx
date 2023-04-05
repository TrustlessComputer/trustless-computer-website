/* eslint-disable jsx-a11y/anchor-is-valid */
import WrapImage from '@/components/WrapImage';
import { ICollection } from '@/models/collection';
import { debounce } from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Container } from './Collections.styled';
import { getCollections } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import Spinner from '@/components/Spinner';

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
        {/* <p className="title">Collections</p> */}
        <div>
          <InfiniteScroll
            className="list"
            dataLength={collections.length}
            hasMore={true}
            loader={isFetching && <Spinner />}
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
              <Masonry gutter="24px">
                {collections.length > 0 &&
                  collections.map((item, index) => {
                    return (
                      <a className="card" href={`/dapps?tab=artifact&contract=${item.contract}`}>
                        <div className="card-content">
                          <div className="card-image">
                            <WrapImage alt={`thumb-${index.toString()}`} className="image" src={item.thumbnail} />
                          </div>
                          <div className="card-info">
                            <p className="card-title">{item.name || shortenAddress(item.contract, 6)}</p>
                            <p className="card-subTitle">{shortenAddress(item.creator, 4)}</p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
              </Masonry>
            </ResponsiveMasonry>
          </InfiniteScroll>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(Collections);
