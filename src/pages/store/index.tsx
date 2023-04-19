import { StyledDappStore } from './Store.styled';
import { CDN_URL } from '@/configs';
import Text from '@/components/Text';
import { ROUTE_PATH } from '@/constants/route-path';
import { DappsTabs } from '@/enums/tabs';
import IconSVG from '@/components/IconSVG';

const DAPPS_LIST = [
  {
    image: `${CDN_URL}/icons/logo-generative.svg`,
    name: 'Generative',
    desc: 'Create BRC-721 collections via smart contracts on the Bitcoin network.',
    link: 'https://generative.xyz/',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-nft.svg`,
    name: 'Trustless NFTs',
    desc: 'Use BRC-721 standard to create NFTs for collectible items, memberships, in-game items, and more.',
    link: `${ROUTE_PATH.DAPPS}?tab=${DappsTabs.NFT}`,
  },

  {
    image: `${CDN_URL}/icons/logo-tc-artifact.svg`,
    name: 'Bitcoin Artifacts',
    desc: 'Store files on Bitcoin. Cheap. Immutable. Fully on-chain. Large files are supported.',
    link: `${ROUTE_PATH.DAPPS}?tab=${DappsTabs.ARTIFACT}`,
  },
  {
    image: `${CDN_URL}/icons/logo-tc-market.svg`,
    name: 'Trustless Market',
    desc: 'BRC-20 is the standard for fungible tokens on Bitcoin. You can use it to represent virtually anything on Bitcoin: a cryptocurrency, a share in a company, voting rights in a DAO, an ounce of gold, and more.',
    link: `${ROUTE_PATH.DAPPS}?tab=${DappsTabs.TOKEN}`,
  },
  {
    image: `${CDN_URL}/icons/logo-tc-name.svg`,
    name: 'Trustless Domain',
    desc: 'BNS is the standard for naming on Bitcoin. No more copying and pasting long addresses. Use your BNS name to receive any token and NFT.',
    link: `${ROUTE_PATH.DAPPS}?tab=${DappsTabs.NAMES}`,
  },
  {
    image: `${CDN_URL}/icons/logo-photos.svg`,
    name: 'Bitcoin Photos',
    desc: 'Coming soon',
    link: '',
  },
];

const DappsStorePage = () => {
  return (
    <StyledDappStore>
      <h2 className="font-ibm">Use decentralized applications on Bitcoin</h2>
      <h6>
        Trustless Computer is a layer-1 protocol that aims to make Bitcoin as generalized as possible - usable for far
        more than just a currency. it enables developers to create DAO, DEX, NFT, token, auction, lending, data storage,
        and many other use cases on Bitcoin
      </h6>
      <div className="app-list">
        {DAPPS_LIST.map((item, index) => (
          <a key={`app-${index}`} href={item.link} className="app-item" target="_blank" rel="noopener noreferrer">
            <div className="app-item__image">
              {/* <img src={item.image} alt={`${item.name} logo`} /> */}
              <IconSVG src="" url={item.image} maxWidth="80" />
            </div>
            <div className="app-item__content">
              <p className="app-name">{item.name}</p>
              <Text size="medium" className="app-desc">
                {item.desc}
              </Text>
            </div>
          </a>
        ))}
      </div>
    </StyledDappStore>
  );
};

export default DappsStorePage;
