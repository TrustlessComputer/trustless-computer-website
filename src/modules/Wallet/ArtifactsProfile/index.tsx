import NFTDisplayBox from '@/components/NFTDisplayBox';
import { getCollectionNfts, getNFTsByWalletAddress } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { getApiKey } from '@/utils/swr';
import { useWeb3React } from '@web3-react/core';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import useSWR from 'swr';
import { Container } from './ArtifactsProfile.styled';
import { ARTIFACT_CONTRACT } from '@/configs';
import Empty from '@/components/Empty';
import { IInscription } from '@/interfaces/api/inscription';

const LIMIT_PAGE = 32;

const ArtifactsProfile = () => {
  const { account } = useWeb3React();

  const profileWallet = account;

  // const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(LIMIT_PAGE);
  const [isFetching, setIsFetching] = useState(false);
  const [inscriptions, setInscriptions] = useState<IInscription[]>([]);

  const fetchInscriptions = async (page = 1, isFetchMore = false) => {
    try {
      setIsFetching(true);
      const data = await getCollectionNfts({
        contractAddress: ARTIFACT_CONTRACT,
        limit: pageSize,
        page: page,
        owner: profileWallet,
      });
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

  const onLoadMoreNfts = () => {
    if (isFetching || inscriptions.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(inscriptions.length / LIMIT_PAGE) + 1;
    fetchInscriptions(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreNfts, 300);

  const formatItemName = (name: string, type: string) => {
    const fileTypeList = type.split('/');
    const fileType = fileTypeList[fileTypeList.length - 1];
    return name ? `${name}.${fileType}` : type;
  };

  useEffect(() => {
    if (profileWallet) fetchInscriptions();
  }, [profileWallet]);

  if (!inscriptions || inscriptions.length === 0) return <Empty />;

  return (
    <Container>
      <div className="content">
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
                          <p className="card-index">Artifacts #{item.tokenId}</p>
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
