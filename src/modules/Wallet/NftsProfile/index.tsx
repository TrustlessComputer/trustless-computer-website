import NFTDisplayBox from '@/components/NFTDisplayBox';
import { getNFTsByWalletAddress } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import { useWeb3React } from '@web3-react/core';
import { debounce } from 'lodash';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import useSWR from 'swr';
import { Container } from './NftsProfile.styled';

// type Props = {};
const LIMIT_PAGE = 32;

const NftsProfile = () => {
  const { account } = useWeb3React();

  const profileWallet = account || '';

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIMIT_PAGE);

  const {
    data: nftslist,
    error,
    isLoading,
  } = useSWR(getApiKey(getNFTsByWalletAddress, { walletAddress: profileWallet, limit: pageSize, page: page }), () =>
    getNFTsByWalletAddress({ walletAddress: profileWallet, limit: pageSize, page: page }),
  );

  const debounceLoadMore = debounce(nextPage => {
    setPage(nextPage);
    setPageSize(pageSize + LIMIT_PAGE);
  }, 300);

  const onLoadMoreNfts = () => {
    if (isLoading || (nftslist && nftslist.length % LIMIT_PAGE !== 0)) return;
    if (nftslist) {
      const nextPage = Math.floor(nftslist?.length / LIMIT_PAGE) + 1;
      debounceLoadMore(nextPage);
    }
  };

  if (error || !nftslist || nftslist.length === 0) return null;

  return (
    <Container>
      <InfiniteScroll
        className="list"
        dataLength={nftslist.length}
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
            {nftslist.length > 0 &&
              nftslist.map((item: any, index: number) => {
                return (
                  <a key={index.toString()} className="card" href={`/collection?contract=${item.contract}`}>
                    <div className="card-content">
                      <div className="card-image">
                        <NFTDisplayBox contentClass="image" src={item.metadata.image} />
                      </div>
                      <div className="card-info">
                        <p className="card-title">{item.name || shortenAddress(item.contract, 6)}</p>
                        <p className="card-subTitle">{shortenAddress(item.owner, 4)}</p>
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

export default NftsProfile;
