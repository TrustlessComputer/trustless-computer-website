import NFTDisplayBox from '@/components/NFTDisplayBox';
import Spinner from '@/components/Spinner';
import WrapImage from '@/components/WrapImage';
import { getCollections } from '@/services/bfs';
import { getCollectionDetail, getCollectionNfts } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Container } from './BFSList.styled';
import { List, Spin } from 'antd';
import useSWRInfinite from 'swr/infinite';

const LIMIT_PAGE = 32;

// const MOCK_ADDRESS = 'test';

const MOCK_CONTRACT_ADDRESS = '0x9841faa1133da03b9ae09e8daa1a725bc15575f0';

const LIMIT = 10;

const BFSList = () => {
  //   const navigate = useNavigate();
  const { id }: any = useParams();

  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(LIMIT);

  //   const [collection, setCollection] = useState<any | undefined>();

  // TODO: Update correct wallet address
  // const walletAdress = MOCK_ADDRESS;

  const {
    data: inscriptions,
    error,
    isLoading,
  } = useSWR(
    getApiKey(getCollectionNfts, { contractAddress: MOCK_CONTRACT_ADDRESS, limit: pageSize, page: page }),
    getCollectionNfts({ contractAddress: MOCK_CONTRACT_ADDRESS, limit: pageSize, page: page }),
  );

  const {
    data: collection,
    error: collectionError,
    isLoading: collectionLoading,
  } = useSWR(
    getApiKey(getCollectionDetail, {
      contractAddress: MOCK_CONTRACT_ADDRESS,
    }),
    getCollectionDetail({
      contractAddress: MOCK_CONTRACT_ADDRESS,
    }),
  );

  //   const { data, error, isLoading } = useSWR(
  //     getApiKey(getCollections),
  //     getCollections,
  //   );

  //   useEffect(() => {
  //     fetchCollectionDetail();
  //     // fetchInscriptions();
  //   }, []);

  //   const fetchCollectionDetail = async () => {
  //     try {
  //       const data = await rpcClient.getCollectionDetail(id);
  //       setCollection(data);
  //     } catch (error) {
  //       navigate('/404');
  //     }
  //   };

  // const localDate = new Date();
  // const utcDate = localDate.toISOString().replace(/T/, " ").replace(/\..+/, "");

  // if (!bfsList) return null;

  const debounceLoadMore = () => {
    setpage(page + 1);
    setpageSize(pageSize + LIMIT);
  };

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
                  <p className="address">{collection?.creator}</p>
                </div>
                <div className="row">
                  <div>
                    <p className="owner">ITEMS</p>
                    <p className="address">{collection?.totalItems}</p>
                  </div>
                  {/* <div>
                  <p className="owner">CREATE DATE</p>
                  <p className="address">{utcDate} UTC</p>
                </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <InfiniteScroll
            className="list"
            dataLength={inscriptions?.data.length}
            hasMore={true}
            loader={isLoading && <Spin />}
            next={debounceLoadMore}
          >
            {inscriptions?.data.length > 0 && (
              <List
                dataSource={inscriptions?.data}
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
                      <a className="card" href={`/inscription/${collection?.contract}/${item.tokenId}`}>
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

export default React.memo(BFSList);
