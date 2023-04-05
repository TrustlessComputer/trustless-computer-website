import NFTDisplayBox from '@/components/NFTDisplayBox';
import WrapImage from '@/components/WrapImage';
import { getCollectionDetail, getCollectionNfts } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import { List, Spin } from 'antd';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Container } from './BFSList.styled';

const LIMIT = 32;

const BFSList = () => {
  //   const navigate = useNavigate();
  const { contract }: any = useParams();

  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(LIMIT);

  //   const [collection, setCollection] = useState<any | undefined>();

  // TODO: Update correct wallet address
  // const walletAdress = MOCK_ADDRESS;

  const { data: inscriptions, isLoading } = useSWR(
    getApiKey(getCollectionNfts, { contractAddress: contract, limit: pageSize, page: page }),
    getCollectionNfts({ contractAddress: contract, limit: pageSize, page: page }),
  );

  const { data: collection } = useSWR(
    getApiKey(getCollectionDetail, {
      contractAddress: contract,
    }),
    getCollectionDetail({
      contractAddress: contract,
    }),
  );

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
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <InfiniteScroll
            className="list"
            dataLength={inscriptions.length}
            hasMore={true}
            loader={isLoading && <Spin />}
            next={debounceLoadMore}
          >
            {inscriptions.length > 0 && (
              <List
                dataSource={inscriptions}
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
