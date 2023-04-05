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

  .iconContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
  }

  .icon {
    width: 18px;
    height: 18px;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }

  .btnMenuMobile {
    display: block;
    background: none;
    padding: rem(8px) 0;
    margin-left: rem(15px);

    svg {
      width: 24px;
      height: 24px;
    }

    .btnMenuMobile_inner {
      position: relative;
      display: block;

      > div:nth-child(1) {
        opacity: 0;
      }

      > div:nth-child(2) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }

    .isOpenMenu {
      .btnMenuMobile_inner {
        > div:nth-child(2) {
          opacity: 0;
        }

        > div:nth-child(1) {
          opacity: 1;
        }
      }
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    .rowLink {
      display: none;
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
