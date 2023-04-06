import NFTDisplayBox from '@/components/NFTDisplayBox';
import WrapImage from '@/components/WrapImage';
import { API_URL } from '@/configs';
import { getCollectionDetail, getCollectionNfts } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import { List, Spin } from 'antd';
import { debounce } from 'lodash';
import queryString from 'query-string';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import { Container } from './BFSList.styled';

const LIMIT = 32;

const ARTIFACTS_CONTRACT_ADDRESS = '0x16EfDc6D3F977E39DAc0Eb0E123FefFeD4320Bc0';

const BFSList = () => {
  // const { contract } = queryString.parse(location.search) as { contract: string };

  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(LIMIT);

  const { data: inscriptions, isLoading } = useSWR(
    getApiKey(getCollectionNfts, { contractAddress: ARTIFACTS_CONTRACT_ADDRESS, limit: pageSize, page: page }),
    () => getCollectionNfts({ contractAddress: ARTIFACTS_CONTRACT_ADDRESS, limit: pageSize, page: page }),
  );

  const { data: collection } = useSWR(`${API_URL}/nft-explorer/collections/${ARTIFACTS_CONTRACT_ADDRESS}`, () =>
    getCollectionDetail({
      contractAddress: ARTIFACTS_CONTRACT_ADDRESS,
    }),
  );

  console.log(collection);

  const debounceLoadMore = debounce(() => {
    setpage(page + 1);
    setpageSize(pageSize + LIMIT);
  }, 300);

  return (
    <Container>
      <div className="content">
        {/* <div className="header">
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
                    <p className="address">{collection?.total_items}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> */}
        <div>
          <InfiniteScroll
            className="list"
            dataLength={inscriptions?.length || 0}
            hasMore={true}
            loader={isLoading && <Spin />}
            next={debounceLoadMore}
          >
            {inscriptions && inscriptions.length > 0 && (
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
