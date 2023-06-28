import React from 'react';
import * as S from './styled';
import * as L from '@/pages/pioneers/components/Share';
import Text from '@/components/Text';

interface IContent {
  title: string;
  contents: string[];
}

const Contents: IContent[] = [
  {
    title: 'Beyond a currency',
    contents: [
      "There are currently $500 Billion worth of assets locked on Bitcoin purely as 'Store of Value', without practical uses, similar to Gold.",
      'Now, with TC protocol, you can finally build dApps on Bitcoin and unlock these potential assets.',
    ],
  },
  {
    title: 'Security and Decentralization',
    contents: [
      'Bitcoin’s design has allowed it to achieve a high level of security and decentralization since 2009.',
      'Its robust infrastructure ensures a secure and stable foundation for application development.',
    ],
  },
  {
    title: 'Utilize Solidity smart contracts',
    contents: [
      'We use Solidity because it’s one of the most understood programming languages for builders.',
      'TC protocol brings the battle-tested EVM to Bitcoin—enabling Solidity devs to build on Bitcoin with endless potential.',
      'Builders can also utilize existing Solidity smart contracts and quickly deploy them on Bitcoin.',
    ],
  },
  {
    title: '2 second block time',
    contents: [
      'Do your dApps need speed and scalability?',
      'We reformatted the battle-tested Optimism codebase and deployed Nitrous Oxide (NOS) as a Bitcoin Layer 2 solution, resulting in a 2-second block time on Bitcoin! (NOS mainnet will go live in mid-July 2023.',
    ],
  },
];

const WhyBuild = React.memo(() => {
  const renderItem = (item: IContent, index: number) => {
    return (
      <S.Item key={item.title}>
        <Text color="white" size="24" fontWeight="semibold" className="title">
          {item.title}
        </Text>
        {item.contents.map(content => (
          <Text className="text-content" key={item.title + index} size="regular">
            {content}
          </Text>
        ))}
      </S.Item>
    );
  };
  return (
    <S.Container>
      <L.Title>Why BUIDL on Bitcoin?</L.Title>
      <S.Content className="g-4 gx-5">{Contents.map(renderItem)}</S.Content>
    </S.Container>
  );
});

export default WhyBuild;
