import React from 'react';
import * as S from './styled';
import * as L from '@/pages/pioneers/components/Share';
import Text from '@/components/Text';
import { CDN_URL } from '@/configs';

interface IContent {
  title: string;
  image: string;
  contents: string[];
}

const Contents: IContent[] = [
  {
    title: 'Decentralized Games',
    image: 'pioneer_game.svg',
    contents: ['Cards', 'Chess', 'RPG', 'Metaverse'],
  },
  {
    title: 'DeFi',
    image: 'pioneer_defi.svg',
    contents: ['Lending & Borrowing', 'DEX', 'DEX Aggregator', 'Stablecoins', 'Derivatives (options/perps/etc)'],
  },
  {
    title: 'NFT',
    image: 'pioneer_nft.svg',
    contents: ['NFT tools', 'DEX', 'NFT marketplaces', 'NFT Finance'],
  },
  {
    title: 'Tools & Infrastructure',
    image: 'pioneer_tool.svg',
    contents: ['Yield Optimizers', 'Oracles', 'Payment solution', ' Storage solution'],
  },
];

const Benefit = React.memo(() => {
  const renderItem = (item: IContent, index: number) => {
    return (
      <S.Item key={item.title}>
        <S.Image src={`${CDN_URL}/images/${item.image}`} />
        <S.ContentItem>
          <Text color="white" size="24" fontWeight="semibold" className="title">
            {item.title}
          </Text>
          {item.contents.map(content => (
            <Text key={item.title + index} size="medium" className="content">
              &#8226; <span className="spacing" />
              {content}
            </Text>
          ))}
        </S.ContentItem>
      </S.Item>
    );
  };
  return (
    <S.Container>
      <S.Liner />
      <S.Box>
        <L.Title fontWeight="bold">The Pioneers</L.Title>
        <S.SubTitle size="20" color="text3">
          Welcome to The Pioneers!
        </S.SubTitle>
        <S.SubTitle size="20" color="text3">
          Bitcoin summer has just started and now is the best time to be The Pioneer BUIDLers on Bitcoin. You can build
          the first dApps on Bitcoin in the following categories (but not limited to)
        </S.SubTitle>
        <S.Content className="g-4 gx-5">{Contents.map(renderItem)}</S.Content>
      </S.Box>
    </S.Container>
  );
});

export default Benefit;
