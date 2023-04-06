import NFTDisplayBox from '@/components/NFTDisplayBox';
import WrapImage from '@/components/WrapImage';
import { ICollection } from '@/models/collection';
import { IInscription } from '@/models/inscription';
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

const LIMIT = 32;

const Collection = () => {
  const navigate = useNavigate();
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
        <div className="header">
          {collection && (
            <div className="infor">
              <div className="infor-left">
                <WrapImage alt="collection" className="image" src={collection?.thumbnail} />
                <div>
                  <p className="title">{collection?.name}</p>
                  <p className="subTitle">{collection?.description}</p>
                </div>
              </div>
              <div className="infor-right">
                <div>
                  <p className="owner">OWNER</p>
                  <a href={`https://explorer.trustless.computer/address/${collection?.creator}`} className="link">
                    {collection?.creator}
                  </a>
                </div>
                <div>
                  <p className="owner">CONTRACT</p>
                  <a href={`https://explorer.trustless.computer/address/${collection?.contract}`} className="link">
                    {collection?.contract}
                  </a>
                </div>
                <div>
                  <p className="owner">ITEMS</p>
                  <p className="address">{collection?.totalItems}</p>
                </div>
              </div>
            </div>
          )}
        </div>
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
