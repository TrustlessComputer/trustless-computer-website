import Dapps from '@/modules/Dapps';
import { StyledDappStore } from './Store.styled';
import { CDN_URL } from '@/configs';
import Text from '@/components/Text';

const DAPPS_LIST = [
  {
    image: `${CDN_URL}/icons/logo-generative.svg`,
    name: 'Generative',
    desc: 'Lorem ipsum dolor sit amet consectetur. Placerat viverra pretium viverra nulla magna.',
    link: 'https://generative.xyz/',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-nft.svg`,
    name: 'Trustless NFTs',
    desc: 'Lorem ipsum dolor sit amet consectetur. Placerat viverra pretium viverra nulla magna Lorem ipsum dolor sit amet consectetur. Placerat viverra pretium viverra nulla magna..',
    link: '',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-market.svg`,
    name: 'Trustless Market',
    desc: 'Lorem ipsum dolor sit amet consectetur. Placerat viverra pretium viverra nulla magna.',
    link: '',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-drive.svg`,
    name: 'Artifacts',
    desc: 'Lorem ipsum dolor sit amet consectetur. Placerat viverra pretium viverra nulla magna. Lorem ipsum dolor sit amet consectetur. Placerat viverra pretium viverra nulla magna.',
    link: '',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-name.svg`,
    name: 'Trustless Domain',
    desc: 'Lorem ipsum dolor sit amet consectetur. Placerat viverra pretium viverra nulla magna. Lorem ipsum dolor sit amet consectetur. Placerat viverra pretium viverra nulla magna.Lorem ipsum dolor sit amet consectetur. Placerat viverra pretium viverra nulla magna.',
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
