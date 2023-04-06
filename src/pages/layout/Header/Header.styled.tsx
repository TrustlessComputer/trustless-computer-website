import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Wrapper = styled.div`
  /* border-bottom: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border3}; */

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

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
    gap: ${px2rem(32)};
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
  line-height: 28px;
  letter-spacing: -0.01em;

  color: ${({ theme, active }: { theme: DefaultTheme; active: boolean }) => (active ? theme.white : theme.text2)};

  :hover {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    opacity: 0.7;
  }
`;

export { Wrapper, Link };
