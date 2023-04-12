import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .showAll {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: ${px2rem(12)};
    margin-bottom: ${px2rem(16)};
    cursor: pointer;

    p {
      font-weight: 400;
      font-size: ${px2rem(18)};
      line-height: ${px2rem(28)};
    }
  }

  .list {
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
    margin-top: ${px2rem(32)};
  }
`;

const Grid = styled.div<{ repeat: string }>`
  display: grid;
  justify-items: center;

  grid-gap: ${px2rem(24)};
  grid-template-columns: ${({ repeat }) => repeat};
`;

export { Container, Grid };
