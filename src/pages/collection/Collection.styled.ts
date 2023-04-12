import styled, { DefaultTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  padding-top: 40px;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 24px;
    width: 100%;

    .list {
      margin-top: 92px;
      min-height: 60vh;

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none;

      ::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
      }
    }

    .loading {
      display: flex;
      justify-content: center;
      margin-top: 32px;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    .content {

      .list {
        margin-top: 264px;
      } 
    }
  `}
`;

export { Container };
