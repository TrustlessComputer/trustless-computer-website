import NFTDisplayBox from '@/components/NFTDisplayBox';
import { getNFTsByWalletAddress } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import { useWeb3React } from '@web3-react/core';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import useSWR from 'swr';
import { Container } from './NftsProfile.styled';
import Empty from '@/components/Empty';
import { IInscription } from '@/interfaces/api/inscription';

// type Props = {};
const LIMIT_PAGE = 32;

const NftsProfile = () => {
  const { account } = useWeb3React();

  const profileWallet = account || '';

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIMIT_PAGE);
  const [isFetching, setIsFetching] = useState(false);
  const [inscriptions, setInscriptions] = useState<IInscription[]>([]);

  const fetchInscriptions = async (page = 1, isFetchMore = false) => {
    try {
      setIsFetching(true);
      const data = await getNFTsByWalletAddress({ walletAddress: profileWallet, limit: pageSize, page: page });
      if (isFetchMore) {
        setInscriptions(prev => [...prev, ...data]);
      } else {
        setInscriptions(data);
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };
  const onLoadMoreCollections = () => {
    if (isFetching || inscriptions.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(inscriptions.length / LIMIT_PAGE) + 1;
    fetchInscriptions(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreCollections, 300);

  useEffect(() => {
    if (profileWallet) fetchInscriptions();
  }, [profileWallet]);

  if (!inscriptions || inscriptions.length === 0)
    return (
      <Container>
        <Empty />
      </Container>
    );

  return (
    <Container>
      <InfiniteScroll
        className="list"
        dataLength={inscriptions.length}
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
            {inscriptions.length > 0 &&
              inscriptions.map((item: any, index: number) => {
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
