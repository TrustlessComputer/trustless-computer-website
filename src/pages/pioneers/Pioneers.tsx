import React from 'react';
import * as S from '@/pages/pioneers/styled';
import Header from '@/pages/pioneers/components/Header';
import Reason from '@/pages/pioneers/components/Reason';

const Pioneers = React.memo(() => {
  return (
    <S.Container>
      <Header />
      <Reason />
    </S.Container>
  );
});

export default Pioneers;
