import Button from '@/components/Button';
import px2rem from '@/utils/px2rem';
import { Tooltip } from 'react-bootstrap';
import styled, { DefaultTheme } from 'styled-components';

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

    .wallet{
      display: none;

      &.mobile{
        display: flex;
      }
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
  font-family: 'IBMPlexMono';

  :hover {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    opacity: 0.7;
  }
`;

const WalletBalance = styled.div`
  display: flex;
  align-items: center;
  gap: ${px2rem(12)};
  padding: ${px2rem(4)};
  padding-left: ${px2rem(12)};
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.primary['5b']};
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 40px;

  .balance {
    display: flex;
    align-items: center;
    gap: ${px2rem(12)};

    .divider {
      width: 1px;
      height: 16px;
      background-color: ${({ theme }: { theme: DefaultTheme }) => theme.primary['5b']};
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const WalletAdress = styled(Tooltip)`
  margin-top: ${px2rem(8)};

  .tooltip-inner {
    background-color: #424242;
    color: white;
    padding: ${px2rem(6)} ${px2rem(16)};
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
  }
  .tooltip-arrow::before {
    border-bottom-color: #424242;
  }
`;

const ConnectWalletButton = styled(Button)`
  background: #4f43e2;
  padding: ${px2rem(4)} ${px2rem(12)};
  color: #fff;
  font-size: ${px2rem(14)};
  line-height: ${px2rem(24)};
  font-weight: 400;
`;

export { ConnectWalletButton, Wrapper, Link, WalletBalance, WalletAdress };
