import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

// ------- Container ------
const ContainerLG = css`
  flex-direction: column;
  gap: 40px;
  margin-top: 45px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 120px;
  margin-top: 96px;
  ${MediaQueryBuilder('lg', ContainerLG)}
`;

// ------- Image ------
const ImageLG = css`
  height: 350px;
`;

const Image = styled.img`
  height: 450px;
  ${MediaQueryBuilder('lg', ImageLG)}
`;

// ------- Content ------

const Content = styled.div`
  flex: 1;
  .lbl-content {
    margin-top: ${px2rem(20)};
    color: #e5e5e5;
  }
`;

export { Container, Image, Content };
