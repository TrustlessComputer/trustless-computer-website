/* eslint-disable jsx-a11y/anchor-is-valid */
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { ARTIFACT_CONTRACT } from '@/configs';
import { ICollection } from '@/interfaces/api/collection';
import { getCollections } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Container } from './List.styled';
import IcCheckBox from '@/assets/icons/ic-checkbox.svg';
import IcCheckedBox from '@/assets/icons/ic-checkedbox.svg';
import IconSVG from '@/components/IconSVG';

const LIMIT_PAGE = 32;

const Collections = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [collections, setCollections] = useState<ICollection[]>([]);

  const [isShowAll, setIsShowAll] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, [isShowAll]);

  const fetchCollections = async (page = 1, isFetchMore = false) => {
    try {
      setIsFetching(true);
      const data = await getCollections(page, LIMIT_PAGE, isShowAll);
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
    () => collections.filter(item => item.contract !== ARTIFACT_CONTRACT.toLocaleLowerCase()),
    [collections],
  );

  return (
    <Container>
      <div className="showAll" onClick={() => setIsShowAll(!isShowAll)}>
        {isShowAll ? (
          <IconSVG src={IcCheckedBox} color="white"></IconSVG>
        ) : (
          <IconSVG src={IcCheckBox} color="white" type="stroke"></IconSVG>
        )}
        <p>Show all</p>
      </div>
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
                        <NFTDisplayBox contentClass="image" src={item.thumbnail} />
                      </div>
                      <div className="card-info">
                        <p className="card-title">{item.name || shortenAddress(item.contract, 6)}</p>
                        <p className="card-subTitle">{shortenAddress(item.creator, 4)}</p>
                        <p className="card-index">Collection #{item.index}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </Container>
  );
};

export default React.memo(Collections);
