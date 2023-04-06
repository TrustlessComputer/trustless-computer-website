import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .indicator {
    position: absolute;
    height: ${px2rem(1)};
    top: ${px2rem(80)};
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.primary[333]};
  }

  .logo {
    z-index: 999;
  }

  a {
    text-decoration: unset;
  }

  .rowLink {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(28)};
  }

  .rightContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(16)};

    .btnMenuMobile {
      display: none;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    .rowLink {
      display: none;
    }

    .rightContainer {
      .btnMenuMobile {
        display: flex;
      }
    }
  `};
`;

const Link = styled.a<{ active: boolean }>`
  cursor: pointer;
  font-weight: 400;
  font-size: ${px2rem(18)};
  line-height: ${px2rem(28)};
  text-decoration: none !important;

  color: ${({ theme, active }: { theme: DefaultTheme; active: boolean }) => (active ? theme.white : theme.text2)};

  :hover {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    opacity: 0.7;
  }
`;

export { Wrapper, Link };
