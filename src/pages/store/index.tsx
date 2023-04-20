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
    creator: 'generative.tc',
    creatorAvatar: `${CDN_URL}/icons/avatar-generative.svg`,
    desc: 'An open platform for creating & collecting art on Bitcoin. Generative is built on top of the Trustless Computer protocol.',
    link: 'https://generative.xyz/',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-nft.svg`,
    name: 'Trustless NFTs',
    creator: '3700.tc',
    creatorAvatar: `${CDN_URL}/icons/avatar-3700.svg`,
    desc: 'Issue your BRC-721 NFTs on Bitcoin for collectible items, memberships, in-game items, and more.',
    link: `${ROUTE_PATH.DAPPS}?tab=${DappsTabs.NFT}`,
  },

  {
    image: `${CDN_URL}/icons/logo-tc-artifact.svg`,
    name: 'Bitcoin Artifacts',
    creator: '368.tc',
    creatorAvatar: `${CDN_URL}/icons/avt-368.svg`,
    desc: 'Issue your BRC-20 tokens on Bitcoin for virtually anything: a cryptocurrency, a share in a company, voting rights in a DAO, and more.',
    link: `${ROUTE_PATH.DAPPS}?tab=${DappsTabs.ARTIFACT}`,
  },
  {
    image: `${CDN_URL}/icons/logo-tc-market.svg`,
    name: 'Trustless Market',
    creator: '686.tc',
    creatorAvatar: `${CDN_URL}/icons/avatar-686.svg`,
    desc: 'Use your BNS (Bitcoin Name System) name to receive any token and NFT. No more copying and pasting long addresses.',
    link: `${ROUTE_PATH.DAPPS}?tab=${DappsTabs.TOKEN}`,
  },
  {
    image: `${CDN_URL}/icons/logo-tc-name.svg`,
    name: 'Trustless Domain',
    creator: '268.tc',
    creatorAvatar: `${CDN_URL}/icons/avt-268.svg`,
    desc: 'BNS is the standard for naming on Bitcoin. No more copying and pasting long addresses. Use your BNS name to receive any token and NFT.',
    link: `${ROUTE_PATH.DAPPS}?tab=${DappsTabs.NAMES}`,
  },
  {
    image: `${CDN_URL}/icons/logo-photos.svg`,
    name: 'Bitcoin Photos',
    creator: 'robot.tc',
    creatorAvatar: `${CDN_URL}/icons/avatar-robot.svg`,
    desc: 'Coming soon',
    link: '',
  },
  {
    image: `${CDN_URL}/icons/logo-remix.svg`,
    name: 'Remix',
    creator: 'ape.tc',
    creatorAvatar: `${CDN_URL}/icons/avt-ape.svg`,
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
          <a
            key={`app-${index}`}
            href={item.link}
            className={`app-item ${!item.link ? 'app-disabled' : ''} `}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="app-item__image">
              {/* <img src={item.image} alt={`${item.name} logo`} /> */}
              <IconSVG src="" url={item.image} maxWidth="80" />
            </div>
            <div className="app-item__content">
              <p className="app-name">{item.name}</p>

              <div className="creator">
                <img src={item.creatorAvatar} width="24" height="24" />
                <p className="app-creator">{item.creator}</p>
              </div>
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
