import NFTDisplayBox from '@/components/NFTDisplayBox';
import { getCollectionNfts } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import { useWeb3React } from '@web3-react/core';
import { debounce } from 'lodash';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import useSWR from 'swr';
import { Container } from './ArtifactsProfile.styled';
import { ARTIFACT_CONTRACT } from '@/configs';
import Empty from '@/components/Empty';

const LIMIT_PAGE = 32;

const ArtifactsProfile = () => {
  const { account } = useWeb3React();

  const profileWallet = account;

  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(LIMIT_PAGE);
  const [isFetching, setIsFetching] = useState(false);

  const { data: inscriptions, isLoading } = useSWR(
    getApiKey(getCollectionNfts, {
      contractAddress: ARTIFACT_CONTRACT,
      limit: pageSize,
      page: page,
      owner: profileWallet,
    }),
    () =>
      getCollectionNfts({
        contractAddress: ARTIFACT_CONTRACT,
        limit: pageSize,
        page: page,
        owner: profileWallet,
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

  if (!inscriptions || inscriptions.length === 0) return <Empty />;

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
                    <a
                      key={index.toString()}
                      className="card"
                      href={`/inscription?contract=${ARTIFACT_CONTRACT}&id=${item.tokenId}`}
                    >
                      <div className="card-content">
                        <div className="card-image">
                          <NFTDisplayBox
                            collectionID={ARTIFACT_CONTRACT}
                            contentClass="image"
                            tokenID={item.tokenId}
                            type={item.contentType}
                          />
                        </div>
                        <div className="card-info">
                          <p className="card-title">{formatItemName(item.name, item.contentType)}</p>
                          <p className="card-subTitle">{shortenAddress(item.owner, 4)}</p>
                          <p className="card-index">File #{item.tokenId}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
            </Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default ArtifactsProfile;
