import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 34px;
    line-height: 44px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    padding: 0px 10px;
  }

  .list {
    margin-top: ${px2rem(8)};
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

  .item {
    padding: ${px2rem(16)} ${px2rem(12)} !important;
  }

  .card {
    width: 100%;
    height: auto;
    text-decoration: none;
    --bs-card-bg: none;
  }

  .card-content {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.primary['2e']};
    border: 1px solid transparent;

    :hover {
      border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.primary['d9']};
    }
  }

  .card-image {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.primary['5b']};
    min-height: ${px2rem(280)};
    .image {
      width: 100%;
      min-height: 100px;
      aspect-ratio: 1 / 1;
      height: auto;
      object-fit: cover;
      padding: ${px2rem(32)};
    }
  }

  .card-info {
    padding: ${px2rem(16)} ${px2rem(24)};

    .card-title {
      font-style: normal;
      font-weight: 500;
      font-size: ${px2rem(20)};
      line-height: ${px2rem(22)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    }

    .card-subTitle {
      font-style: normal;
      font-weight: 500;
      font-size: ${px2rem(18)};
      line-height: ${px2rem(20)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};
    }

    .card-index {
      font-style: normal;
      font-weight: 500;
      font-size: ${px2rem(14)};
      margin-top: ${px2rem(12)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    .card-image {
      .image {
        padding: 24px;
      }
    }
  `}
`;

export { Container };
