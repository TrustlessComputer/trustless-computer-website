import IcNosLayers from '@/assets/icons/ic-nos-scaling.svg';
import IcHow from '@/assets/icons/ic-how-layer2.svg';
import IcDappGroup from '@/assets/icons/ic-dapps-layer2.png';

export interface IContentLayer2 {
  title: string;
  desc: string[];
  img: any;
  isPng?: boolean;
  contents?: {
    title: string;
    link: string;
  }[];
}

export const Contents: IContentLayer2[] = [
  {
    title: 'Secure scaling for Bitcoin.',
    desc: [
      'NOS is a fast, stable, and scalable Bitcoin L2 blockchain.',
      'Increasing Bitcoin capability in terms of speed is fundamental to the mass adoption of decentralized applications on Bitcoin.',
      'The main goal of NOS (or “Nitrous Oxide”) is to turbocharge Bitcoin transactions (reduce transaction latency) without sacrificing decentralization or security.',
    ],
    img: IcNosLayers,
  },
  {
    title: 'How does it work?',
    desc: [
      'NOS reuses the battle-tested Optimism codebase. It is a modified version of the OP Stack that adds support for Bitcoin.',
      'Like Optimism, NOS uses Optimistic Rollup, a fancy way of describing a blockchain that piggybacks off the security of another blockchain.',
      'In this case, NOS takes advantage of the consensus mechanism of Bitcoin instead of its own. This is possible thanks to the Trustless Computer protocol, which brings smart contract capability to Bitcoin.',
    ],
    img: IcHow,
  },
  {
    title: 'Explore dapps on L2.',
    desc: [
      'L2 is perfect for dapps that need speed. Discover the first dapps on Bitcoin. Here are some of our favorites.',
    ],
    img: IcDappGroup,
    isPng: true,
    contents: [
      {
        link: 'https://dgames.gg/',
        title: 'Gaming: Satoshi’s Gambit',
      },
    ],
  },
];
