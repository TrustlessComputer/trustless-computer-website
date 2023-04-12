import NFTCard from '@/components/NFTCard';
import { API_URL } from '@/configs';
import { getCollectionDetail, getCollectionNfts } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import useSWR from 'swr';
import { Container } from './BFSList.styled';

const LIMIT_PAGE = 32;

const ARTIFACTS_CONTRACT_ADDRESS = '0x16EfDc6D3F977E39DAc0Eb0E123FefFeD4320Bc0';

const BFSList = () => {
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

  const formatItemName = (name: string, type: string) => {
    const fileTypeList = type.split('/');
    const fileType = fileTypeList[fileTypeList.length - 1];
    return name ? `${name}.${fileType}` : type;
  };
  return (
    <Container>
      <div className="content">
        <InfiniteScroll
          className="list"
          dataLength={inscriptions?.length || 0}
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
              {inscriptions &&
                inscriptions.length > 0 &&
                inscriptions.map((item, index) => {
                  return (
                    <NFTCard
                      key={index.toString()}
                      href={`/inscription?contract=${collection?.contract}&id=${item.tokenId}`}
                      image={item.image}
                      contract={collection?.contract}
                      tokenId={item.tokenId}
                      contentType={item.contentType}
                      title1={formatItemName(item.name, item.contentType)}
                      title2={shortenAddress(item.owner, 4)}
                      title3={`Artifact #${item.tokenId}`}
                    />
                  );
                })}
            </Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default React.memo(BFSList);
