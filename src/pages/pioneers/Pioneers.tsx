import React from 'react';
import * as S from '@/pages/pioneers/styled';
import Header from '@/pages/pioneers/components/Header';
import WhyBuild from '@/pages/pioneers/components/WhyBuild';
import Benefit from '@/pages/pioneers/components/Benefit';

const Pioneers = React.memo(() => {
  return (
    <S.Container>
      <Header />
      <WhyBuild />
      <Benefit />
    </S.Container>
  );
});

export default Pioneers;
