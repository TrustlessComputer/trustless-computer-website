/* eslint-disable jsx-a11y/anchor-is-valid */
import WrapImage from '@/components/WrapImage';
import { ICollection } from '@/models/collection';
import { debounce } from 'lodash';
import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Container } from './Collections.styled';
import { getCollections } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import Spinner from 'react-bootstrap/Spinner';
import { ARTIFACT_CONTRACT } from '@/configs';

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

  const showCollections = useMemo(
    () => collections.filter(item => item.totalItems > 0 && item.contract !== ARTIFACT_CONTRACT),
    [collections],
  );

  return (
    <Container>
      <div className="content">
        <div>
          <InfiniteScroll
            className="list"
            dataLength={showCollections.length}
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
              <Masonry gutter="24px">
                {showCollections.length > 0 &&
                  showCollections.map((item, index) => {
                    return (
                      <a key={index.toString()} className="card" href={`/collection?contract=${item.contract}`}>
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
