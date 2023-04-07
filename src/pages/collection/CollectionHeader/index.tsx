import IcDiscord from '@/assets/icons/ic_discord_black.svg';
import IcTwitter from '@/assets/icons/ic_twitter_black.svg';
import IcWebsite from '@/assets/icons/ic_website_black.svg';
import IconSVG from '@/components/IconSVG';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { ICollection } from '@/models/collection';
import React from 'react';
import { Container } from './CollectionHeader.styled';

interface ICollectionHeader {
  collection?: ICollection;
}

const CollectionHeader = (props: ICollectionHeader) => {
  const { collection } = props;

  return (
    <Container>
      {collection && (
        <div className="infor">
          <div className="infor-left">
            <NFTDisplayBox contentClass="image" src={collection?.thumbnail} />
            <div>
              <p className="title">{collection?.name}</p>
              <p className="subTitle">{collection?.description}</p>
            </div>
          </div>
          <div className="infor-right">
            {(collection.social.website || collection.social.website || collection.social.website) && (
              <div className="social">
                {collection.social.website && (
                  <a href={collection.social.website} target="_blank" className="link">
                    <IconSVG src={IcWebsite} />
                  </a>
                )}
                {collection.social.discord && (
                  <a href={collection.social.discord} target="_blank" className="link">
                    <IconSVG src={IcDiscord} />
                  </a>
                )}
                {collection.social.twitter && (
                  <a href={collection.social.twitter} target="_blank" className="link">
                    <IconSVG src={IcTwitter} />
                  </a>
                )}
              </div>
            )}
            <div>
              <p className="owner">OWNER</p>
              <a
                href={`https://explorer.trustless.computer/address/${collection?.creator}`}
                target="_blank"
                className="link"
              >
                {collection?.creator}
              </a>
            </div>
            <div>
              <p className="owner">CONTRACT</p>
              <a
                href={`https://explorer.trustless.computer/token/${collection?.contract}`}
                target="_blank"
                className="link"
              >
                {collection?.contract}
              </a>
            </div>
            <div className="row-bottom">
              {/* <div>
                <p className="owner">COLLECTION NUMBER</p>
                <p className="address">#{collection?.totalItems}</p>
              </div> */}
              <div>
                <p className="owner">ITEMS</p>
                <p className="address">{collection?.totalItems}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default React.memo(CollectionHeader);
