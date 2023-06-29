import IcBitcoinNetwork from '@/assets/icons/ic-btc-network.svg';
import IcDappGroup from '@/assets/icons/ic-dapp-group.svg';
import IcNosLayers from '@/assets/icons/ic-how-layer1.svg';

export interface IContentLayer1 {
  title: string;
  desc: string;
  img: any;
  maxSize?: number;
  contents: {
    title: string;
    link: string;
  }[];
}

export const Contents: IContentLayer1[] = [
  {
    title: 'Write smart contract on Bitcoin.',
    desc: 'Trustless Computer is a layer-1 protocol that broadens the utility of Bitcoin beyond a cryptocurrency. Allowing you to create a DAO, DEX, NFT, token, auction lending, data storage, and so much more.',
    img: IcBitcoinNetwork,
    maxSize: 600,
    contents: [
      {
        title: 'Issue your own token on Bitcoin',
        link: 'https://docs.trustless.computer/contracts-tokens/brc-20-fungible-tokens',
      },
      {
        title: 'Kickstart a project with a crowdsale',
        link: 'https://docs.trustless.computer/contracts-finance/crowdsale',
      },
      {
        title: 'Issue NFTs',
        link: 'https://docs.trustless.computer/contracts-tokens/brc-721-nfts',
      },
      {
        title: 'Run an auction',
        link: 'https://docs.trustless.computer/contracts-finance/auction',
      },
      {
        title: 'Build a DAO',
        link: 'https://docs.trustless.computer/contracts-governance/dao',
      },
    ],
  },
  {
    title: 'How does it work?',
    desc: 'Trustless Computer is a state machine similar to Ethereum-VM that utilizes the Bitcoin blockchain as a data layer to achieve transaction-level consensus. This approach allows Trustless Computer to function as a general-purpose state machine while taking advantage of the Bitcoin blockchain’s security and data availability without requiring additional modules, such as network or consensus protocols.',
    img: IcNosLayers,
    contents: [
      {
        title: 'Learn more',
        link: 'https://docs.trustless.computer/trustless-computer/layer-1-trustless-computer',
      },
    ],
  },
  {
    title: 'Explore dapps on Bitcoin.',
    desc: 'Discover the first dapps on Bitcoin. Here are some of our favorites.',
    img: IcDappGroup,
    contents: [
      {
        title: 'Finance: New Bitcoin DEX',
        link: 'https://newbitcoindex.com/',
      },
      {
        title: 'Arts: Generative',
        link: 'https://generative.xyz/',
      },
      {
        title: 'Gaming: Satoshi’s Gambit',
        link: 'https://dgames.gg/',
      },
      {
        title: 'Consumer apps: Bitcoin Photos',
        link: 'https://trustless.photos/about',
      },
      {
        title: 'Infrastructure: Bitcoin File System',
        link: 'https://twitter.com/punk3700/status/1669014135206731776',
      },
    ],
  },
];
