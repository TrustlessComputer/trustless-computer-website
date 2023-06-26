import React from 'react';
import * as S from '@/pages/pioneers/styled';
import Header from '@/pages/pioneers/components/Header';

const Pioneers = React.memo(() => {
  return (
    <S.Container>
      <Header />
    </S.Container>
  );
});

export default Pioneers;
