import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import * as L from '@/pages/pioneers/components/Share';
import px2rem from '@/utils/px2rem';

// ------- Container ------
const ContainerLG = css`
  margin-top: 40px;
`;

const Container = styled(L.BorderBox)`
  margin-top: 80px;
  ${MediaQueryBuilder('lg', ContainerLG)}
`;

// ------- Content ------
const ContentLG = css`
  margin-top: 20px;
  grid-template-columns: 1fr;
  gap: 24px;
`;
const Content = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  ${MediaQueryBuilder('lg', ContentLG)}
`;

// ------- Item ------
const Item = styled.div`
  .title {
    padding-bottom: ${px2rem(16)};
  }
`;

export { Container, Content, Item };
