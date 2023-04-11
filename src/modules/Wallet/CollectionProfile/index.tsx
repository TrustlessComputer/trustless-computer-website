import IcCheckBox from '@/assets/icons/ic-checkbox.svg';
import IcCheckedBox from '@/assets/icons/ic-checkedbox.svg';
import IconSVG from '@/components/IconSVG';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { getCollections } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import { useWeb3React } from '@web3-react/core';
import { debounce } from 'lodash';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import useSWR from 'swr';
import { Container } from '../NftsProfile/NftsProfile.styled';

type Props = {};

const LIMIT_PAGE = 20;

const CollectionProfile = (props: Props) => {
  const { account } = useWeb3React();

  const profileWallet = account || '';

  const [isShowAll, setIsShowAll] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIMIT_PAGE);

  const {
    data: collectionsList,
    error,
    isLoading,
  } = useSWR(getApiKey(getCollections, { page, LIMIT_PAGE, isShowAll, profileWallet }), () =>
    getCollections(page, LIMIT_PAGE, isShowAll, profileWallet),
  );

  const debounceLoadMore = debounce(nextPage => {
    setPage(nextPage);
    setPageSize(pageSize + LIMIT_PAGE);
  }, 300);

  const onLoadMoreNfts = () => {
    if (isLoading || (collectionsList && collectionsList.length % LIMIT_PAGE !== 0)) return;
    if (collectionsList) {
      const nextPage = Math.floor(collectionsList?.length / LIMIT_PAGE) + 1;
      debounceLoadMore(nextPage);
    }
  };

  if (error || !collectionsList || collectionsList.length === 0) return null;

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
        dataLength={collectionsList.length}
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
          <Masonry gutter="24px">
            {collectionsList.length > 0 &&
              collectionsList.map((item: any, index: number) => {
                return (
                  <a
                    key={index.toString()}
                    className="card"
                    href={`/collection?contract=${item.contract}?owner=${profileWallet}`}
                  >
                    <div className="card-content">
                      <div className="card-image">
                        <NFTDisplayBox contentClass="image" src={item.thumbnail} />
                      </div>
                      <div className="card-info">
                        <p className="card-title">{item.name || shortenAddress(item.contract, 6)}</p>
                        <p className="card-subTitle">{shortenAddress(item.owner, 4)}</p>
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

export default CollectionProfile;
