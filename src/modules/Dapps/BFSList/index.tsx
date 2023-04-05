import { fetchBFSFiles, getCollections } from '@/services/bfs';
import { getApiKey } from '@/utils/swr';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

const LIMIT_PAGE = 32;

const MOCK_ADDRESS = 'test';

const BFSList = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();

  const [collection, setCollection] = useState<any | undefined>();

  const walletAdress = MOCK_ADDRESS;

  const { data, error, isLoading } = useSWR<{ address: string }>(
    getApiKey(fetchBFSFiles, { walletAdress }),
    fetchBFSFiles({ address: walletAdress }),
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

  return (
    <Container>
      {/* <div className="content">
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
      {/* </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <InfiniteScroll
            className="list"
            dataLength={inscriptions.length}
            hasMore={true}
            loader={isFetching && <Spin className="loading" />}
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
                renderItem={(item: IInscription, index: number) => {
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
      </div> */}
    </Container>
  );
};

export default React.memo(BFSList);
