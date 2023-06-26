import React from 'react';
import * as S from './styled';
import { CDN_URL } from '@/configs';
import Text from '@/components/Text';

const Header = React.memo(() => {
  return (
    <S.Container>
      <S.Content>
        <Text className="lbl-title" size="medium" fontWeight="bold">
          Welcome to the era of dApps on Bitcoin
        </Text>
        <Text color="text3" size="20" className="lbl-content">
          Make history as the FIRST to BUIDL on Bitcoin using Solidity smart contracts. Powered by Trustless Computer
          Protocol, you can build DAOs, NFTs, DeFi, GameFi, and so much more on Bitcoin!
        </Text>
      </S.Content>
      <S.Image className="icon" src={CDN_URL + '/images/astronaut.svg'} />
    </S.Container>
  );
});

export default Header;
