import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Styled = styled.a`
  width: 100%;
  height: 100%;
  text-decoration: none !important;
  --bs-card-bg: none;

  background: ${({ theme }: { theme: DefaultTheme }) => theme.primary['2e']};
  border: 1px solid transparent;

  :hover {
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.primary['d9']};
  }

  .card-content {
  }

  .card-image {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.primary['5b']};
    min-height: ${px2rem(180)};
    padding: ${px2rem(32)};
    position: relative;

    .image {
      width: 100%;
      min-height: 100px;
      aspect-ratio: 1 / 1;
      height: auto;
      object-fit: cover;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  .card-info {
    padding: ${px2rem(16)} ${px2rem(24)};

    .card-title1 {
      font-style: normal;
      font-weight: 500;
      font-size: ${px2rem(22)};
      line-height: ${px2rem(32)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .card-title2 {
      font-style: normal;
      font-weight: 500;
      font-size: ${px2rem(18)};
      line-height: ${px2rem(28)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .card-title3 {
      font-style: normal;
      font-weight: 500;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(26)};
      margin-top: ${px2rem(12)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;
