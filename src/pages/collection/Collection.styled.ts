import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${px2rem(40)};
  padding-top: ${px2rem(40)};

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: ${px2rem(24)};
    width: 100%;

    .list {
      margin-top: ${px2rem(92)};
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

    .grid {
      display: grid;
      justify-items: center;
      margin-top: ${px2rem(24)};

      grid-gap: ${px2rem(24)};
      grid-template-columns: repeat(auto-fit, minmax(348px, 1fr));
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    .content {

      .list {
        margin-top: ${px2rem(264)};
      }
    }
  `}
`;

export { Container };
