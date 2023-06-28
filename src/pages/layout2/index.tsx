import React from 'react';
import { Outlet } from 'react-router-dom';
import Meta from './Meta';
import Footer from './Footer';
import Header from './Header';
import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const HEADER_HEIGHT = 80;
const FO0TER_HEIGHT = 80;

export const WrapContainer = styled.div`
  background-color: white;
`;

export const Container = styled.div`
  min-height: 100vh;
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding: 0 ${px2rem(32)};

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
      padding-left: 7%;
      padding-right: 7%;
  `}
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 140px);
  display: flex;
  align-self: center;
  width: 100%;

  > div {
    width: 100%;
  }
`;

const Layout2 = () => {
  return (
    <WrapContainer>
      <Container>
        <Meta />
        <Header height={HEADER_HEIGHT} />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        <Footer height={FO0TER_HEIGHT} />
      </Container>
    </WrapContainer>
  );
};

export default Layout2;
