import NFTDisplayBox from '@/components/NFTDisplayBox';
import { API_URL } from '@/configs';
import { getCollectionDetail, getCollectionNfts } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import { List, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import { Container } from './NamesList.styled';

const LIMIT_PAGE = 32;

const ARTIFACTS_CONTRACT_ADDRESS = '0x16EfDc6D3F977E39DAc0Eb0E123FefFeD4320Bc0';

const NamesList = () => {
  // const { contract } = queryString.parse(location.search) as { contract: string };

  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(LIMIT_PAGE);
  const [isFetching, setIsFetching] = useState(false);

  const { data: inscriptions, isLoading } = useSWR(
    getApiKey(getCollectionNfts, { contractAddress: ARTIFACTS_CONTRACT_ADDRESS, limit: pageSize, page: page }),
    () => getCollectionNfts({ contractAddress: ARTIFACTS_CONTRACT_ADDRESS, limit: pageSize, page: page }),
  );

  const { data: collection } = useSWR(`${API_URL}/nft-explorer/collections/${ARTIFACTS_CONTRACT_ADDRESS}`, () =>
    getCollectionDetail({
      contractAddress: ARTIFACTS_CONTRACT_ADDRESS,
    }),
  );

  const debounceLoadMore = debounce(nextPage => {
    setpage(nextPage);
    setpageSize(pageSize + LIMIT_PAGE);
  }, 300);

  const onLoadMoreNfts = () => {
    if (isFetching || (inscriptions && inscriptions.length % LIMIT_PAGE !== 0)) return;
    if (inscriptions) {
      const nextPage = Math.floor(inscriptions?.length / LIMIT_PAGE) + 1;
      debounceLoadMore(nextPage);
    }
  };

  return (
    <Container>
      <div className="content">
        <div>
          <InfiniteScroll
            className="list"
            dataLength={inscriptions?.length || 0}
            hasMore={true}
            loader={isLoading && <Spin />}
            next={onLoadMoreNfts}
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
                      <div
                        className="card"
                        // href={`/inscription/${collection?.contract}/${item.tokenId}`}
                      >
                        <div className="card-content">
                          <div className="card-info">
                            <p className="card-title">Title</p>
                            <p className="card-subTitle">Owner</p>
                            <p className="card-subTitle">Name #1</p>
                          </div>
                        </div>
                      </div>
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

export default React.memo(NamesList);
