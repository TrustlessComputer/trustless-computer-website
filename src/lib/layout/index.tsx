import { ReactNode } from "react";
import styled from "styled-components";

import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const HEADER_HEIGHT = 80;
const FO0TER_HEIGHT = 80;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 140px);
  background-color: ${({ theme }) => theme.bg1};
  display: flex;
`;

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Meta />
      <div>
        <Header height={HEADER_HEIGHT} />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer height={FO0TER_HEIGHT} />
      </div>
    </Container>
  );
};

export default Layout;
