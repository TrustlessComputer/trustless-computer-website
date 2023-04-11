import NFTDisplayBox from '@/components/NFTDisplayBox';
import WrapImage from '@/components/WrapImage';
import { ICollection } from '@/interfaces/api/collection';
import { IInscription } from '@/interfaces/api/inscription';
import { getCollectionDetail, getCollectionNfts } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import Spinner from 'react-bootstrap/Spinner';
import { debounce } from 'lodash';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useNavigate } from 'react-router-dom';
import { Container } from './Collection.styled';
import { useWeb3React } from '@web3-react/core';
import CollectionHeader from './CollectionHeader';

const LIMIT = 32;

const Collection = () => {
  const navigate = useNavigate();
  const { account } = useWeb3React();

  const { contract } = queryString.parse(location.search) as { contract: string };

  const [collection, setCollection] = useState<ICollection | undefined>();

  const [isFetching, setIsFetching] = useState(false);
  const [inscriptions, setInscriptions] = useState<IInscription[]>([]);

  useEffect(() => {
    fetchCollectionDetail();
    fetchInscriptions();
  }, [contract]);

  const fetchCollectionDetail = async () => {
    try {
      const data = await getCollectionDetail({ contractAddress: contract });
      setCollection(data);
    } catch (error) {
      navigate('/404');
    }
  };

  const fetchInscriptions = async (page = 1, isFetchMore = false) => {
    try {
      setIsFetching(true);
      const data = await getCollectionNfts({ contractAddress: contract, page, limit: LIMIT });
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
    if (isFetching || inscriptions.length % LIMIT !== 0) return;
    const page = Math.floor(inscriptions.length / LIMIT) + 1;
    fetchInscriptions(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreCollections, 300);

  return (
    <Container>
      <div className="content">
        <CollectionHeader collection={collection} />
        <div>
          <InfiniteScroll
            className="list"
            dataLength={inscriptions?.length || 0}
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
                {inscriptions &&
                  inscriptions.length > 0 &&
                  inscriptions.map((item, index) => {
                    return (
                      <a
                        key={index.toString()}
                        className="card"
                        href={`/inscription?contract=${collection?.contract}&id=${item.tokenId}`}
                      >
                        <div className="card-content">
                          <div className="card-image">
                            <NFTDisplayBox
                              collectionID={collection?.contract}
                              contentClass="image"
                              tokenID={item.tokenId}
                              type={item.contentType}
                            />
                          </div>
                          <div className="card-info">
                            <p className="card-title">{item.name}</p>
                            <p className="card-subTitle">{shortenAddress(item.owner, 4)}</p>
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

export default React.memo(Collection);
