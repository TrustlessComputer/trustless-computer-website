import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import * as L from '@/pages/pioneers/components/Share';
import px2rem from '@/utils/px2rem';
import Text from '@/components/Text';

// ------- Container ------
const Container = styled.div``;

// ------- Liner ------
const LinerLarge = css`
  margin: 40px 0;
`;

const Liner = styled.div`
  height: 1px;
  background-color: #898989;
  width: 100%;
  margin: 80px 0;
  ${MediaQueryBuilder('lg', LinerLarge)}
`;

// ------- Box ------
const Box = styled(L.BorderBox)``;

// ------- SubTitle ------
const SubTitle = styled(Text)``;

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
const ImageMedium = css`
  max-width: 150px;
`;
const Image = styled.img`
  max-width: 260px;
  ${MediaQueryBuilder('md', ImageMedium)}
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

const ContentItem = styled.div`
  .title {
    padding-bottom: ${px2rem(16)};
  }
  .content {
    line-height: 180% !important;
    margin-left: 12px;
  }
  .spacing {
    width: 6px;
  }
`;

export { Container, Content, Item, Liner, Box, SubTitle, Image, ContentItem };
