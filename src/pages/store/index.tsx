import { StyledDappStore } from './Store.styled';
import { CDN_URL } from '@/configs';
import Text from '@/components/Text';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink.styled';
import ModalCreateDapp from './ModalCreateDapp';
import { useEffect, useState } from 'react';
import { getListDappStore } from '@/services/store';
import { IDappStore } from '@/interfaces/api/store';
import IconSVG from '@/components/IconSVG';

const DAPPS_LIST = [
  {
    image: `${CDN_URL}/icons/wallet_logo.svg`,
    name: 'Trustless Wallet',
    creator: 'dev.tc',
    desc: 'A crypto wallet & gateway to decentralized applications on Bitcoin.',
    link: 'https://trustlesswallet.io/',
  },
  {
    image: `${CDN_URL}/icons/logo-bridge.svg`,
    name: 'Trustless Bridge',
    creator: 'dev.tc',
    desc: 'A two-way bridge that enables seamless transfer of assets between Bitcoin, Ethereum and Trustless Computer.',
    link: 'https://trustlessbridge.io/',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-market.svg`,
    name: 'New Bitcoin DEX',
    creator: 'dev.tc',
    desc: 'New Bitcoin DEX is the first decentralized exchange platform that operates on the Bitcoin blockchain through the use of trustless computers. With Trustless Market, you can easily swap cryptocurrencies, join a launchpad, gain voting rights in DAO and so much more!',
    link: `https://newbitcoindex.com/`,
  },
  {
    image: `${CDN_URL}/icons/logo-tc-name.svg`,
    name: 'Trustless Domain',
    creator: '286.tc',
    desc: 'Use your BNS (Bitcoin Name System) name to receive any token and NFT. No more copying and pasting long addresses.',
    link: `https://trustless.domains/`,
  },
  {
    image: `https://cdn.trustlessartifacts.com/pages/artifacts/logo-1.svg`,
    name: 'Smart Inscription',
    creator: '368.tc',
    desc: 'Store files on Bitcoin. Cheap. Immutable. Fully on-chain. Large files are supported.',
    link: `https://smartinscription.xyz/about`,
  },
  {
    image: `${CDN_URL}/icons/logo-generative-dark.svg`,
    name: 'Generative',
    creator: 'generative.tc',
    // creatorAvatar: `${CDN_URL}/icons/avatar-generative.svg`,
    desc: 'An open platform for creating & collecting art on Bitcoin.',
    link: 'https://generative.xyz/',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-nft.svg`,
    name: 'Trustless NFTs',
    creator: '3700.tc',
    desc: 'Issue your BRC-721 NFTs on Bitcoin for collectible items, memberships, in-game items, and more.',
    link: `https://trustlessnfts.com/`,
  },
  {
    image: `${CDN_URL}/icons/logo-remix.svg`,
    name: 'Trustless IDE',
    creator: 'ape.tc',
    desc: 'Deploy contracts on Trustless Computer. Simple. Quick. No additional technical requirements.',
    link: 'https://trustlesside.com/',
  },
  {
    image: `${CDN_URL}/icons/logo-photos.svg`,
    name: 'Bitcoin Photos',
    creator: 'robot.tc',
    desc: 'Bitcoin Photos is the home for all your photos, saved forever on Bitcoin. Your photos are encrypted for your privacy. They are only viewable by you with your keys.',
    link: 'https://trustless.photos/about',
  },
];

const DappsStorePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [dapps, setDapps] = useState<IDappStore[]>([]);

  useEffect(() => {
    getDappsStore();
  }, []);

  const getDappsStore = async () => {
    try {
      const data = await getListDappStore();
      setDapps(data);
    } catch (error) {}
  };

  return (
    <StyledDappStore>
      <h2 className="font-ibm">Use dapps on Bitcoin.</h2>
      <p className="desc">
        Trustless Computer lets developers write smart contracts on Bitcoin. So now you can use all the dapps you love
        on Bitcoin: NFTs, DeFi, Payments, Gaming, DAOs, file storage, and many other dapps uniquely on Bitcoin.
      </p>
      <div className="header-actions">
        <ButtonLink href="https://tcgasstation.com/" target="_blank" className="header-actions-btn">
          <p className="button-link-text">Get TC</p>
        </ButtonLink>
        <div onClick={() => setShowModal(true)} className="submitBtn header-actions-btn">
          <p>Submit a dapp</p>
        </div>
      </div>
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
              <IconSVG src="" url={item.image} maxWidth="80" />
            </div>
            <div className="app-item__content">
              <p className="app-name">{item.name}</p>

              <div className="creator">
                <p className="app-creator">by {item.creator}</p>
              </div>
              <Text size="medium" className="app-desc">
                {item.desc}
              </Text>
            </div>
          </a>
        ))}
        {dapps &&
          dapps.length > 0 &&
          dapps.map(item => (
            <a
              key={`app-${item.id}`}
              href={item.link}
              className={`app-item ${!item.link ? 'app-disabled' : ''} `}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="app-item__image">
                <img alt={`${item.name} logo`} src={item.image} />
              </div>
              <div className="app-item__content">
                <p className="app-name">{item.name}</p>

                <div className="creator"></div>
                <Text size="medium" className="app-desc">
                  {item.desc}
                </Text>
              </div>
            </a>
          ))}
      </div>
      <ModalCreateDapp
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleCreateSuccess={() => getDappsStore()}
      />
    </StyledDappStore>
  );
};

export default DappsStorePage;
