import NFTCard from '@/components/NFTCard';
import { API_URL } from '@/configs';
import { IInscription } from '@/interfaces/api/inscription';
import { getCollectionDetail, getCollectionNfts } from '@/services/nft-explorer';
import { shortenAddress } from '@/utils';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import { Container, Grid } from './BFSList.styled';

const LIMIT_PAGE = 32;

const ARTIFACTS_CONTRACT_ADDRESS = '0x16EfDc6D3F977E39DAc0Eb0E123FefFeD4320Bc0';

const BFSList = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { data: collection } = useSWR(`${API_URL}/nft-explorer/collections/${ARTIFACTS_CONTRACT_ADDRESS}`, () =>
    getCollectionDetail({
      contractAddress: ARTIFACTS_CONTRACT_ADDRESS,
    }),
  );

  const [inscriptions, setInscriptions] = useState<IInscription[]>([]);

  useEffect(() => {
    fetchInscriptions();
  }, []);

  const fetchInscriptions = async (page = 1, isFetchMore = false) => {
    try {
      setIsFetching(true);
      const data = await getCollectionNfts({ contractAddress: ARTIFACTS_CONTRACT_ADDRESS, page, limit: LIMIT_PAGE });
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
            isFetching && (
              <div className="loading">
                <Spinner animation="border" variant="primary" />
              </div>
            )
          }
          next={debounceLoadMore}
        >
          <Grid repeat={`repeat(auto-fit, minmax(348px, ${inscriptions && inscriptions.length > 4 ? 1 : 0.25}fr))`}>
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
          </Grid>
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default React.memo(BFSList);
