import { StyledDappStore } from './Store.styled';
import { CDN_URL } from '@/configs';
import Text from '@/components/Text';

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
    link: '',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-market.svg`,
    name: 'Trustless Market',
    desc: 'Swap tokens, browse, buy, sell, and auction NFTs on TC protocol.',
    link: '',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-artifact.svg`,
    name: 'Bitcoin Artifacts',
    desc: 'Store files on Bitcoin. Cheap. Immutable. Fully on-chain. Large files are supported.',
    link: '',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-name.svg`,
    name: 'Trustless Domain',
    desc: 'Name your TC wallet and use your BNS name to receive any token and NFT. No more copying and pasting long addresses.',
    link: '',
  },
  // {
  //   image: `${CDN_URL}/icons/logo-tc-name.svg`,
  //   name: 'Bitcoin Photos',
  //   desc: 'Save your images forever on Bitcoin. Fully on-chain. Easy access.',
  //   link: '',
  // },
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
              <img src={item.image} alt={`${item.name} logo`} />
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
