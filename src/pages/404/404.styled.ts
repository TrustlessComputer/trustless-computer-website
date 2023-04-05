import styled, { DefaultTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  /* padding-top: 50px; */
  justify-content: center;

  .title {
    font-weight: 500;
    font-size: 56px;
    line-height: 66px;
    align-items: center;
    align-self: center;
    letter-spacing: -0.02em;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  }
`;

export { Container };
