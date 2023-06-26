import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import * as L from '@/pages/pioneers/components/Share';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
`;
const Content = styled(Row)`
  margin-top: 40px;
  ${MediaQueryBuilder('lg', ContentLG)}
`;

// ------- Item ------
const Item = styled(Col)`
  .title {
    padding-bottom: ${px2rem(16)};
  }
`;

export { Container, Content, Item };
