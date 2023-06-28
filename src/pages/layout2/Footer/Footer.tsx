import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';
import IcOutward from '@/assets/icons/ic-arrow-outward-2.svg';

import { CDN_URL } from '@/configs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${px2rem(140)};
  flex-wrap: wrap;
  gap: ${px2rem(32)};

  @media screen and (max-width: ${({ theme }: { theme: DefaultTheme }) => theme.breakpoint.md}) {
    gap: ${px2rem(16)};
    margin-top: ${px2rem(60)};
  }

  .text {
    font-style: normal;
    font-weight: 500;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(26)};
    margin-right: ${px2rem(16)};
    color: #1c1c1c !important;

    @media screen and (max-width: ${({ theme }: { theme: DefaultTheme }) => theme.breakpoint.md}) {
      order: 2;
      padding-bottom: ${px2rem(32)};
    }
  }

  .footer-right {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${px2rem(32)};

    @media screen and (max-width: ${({ theme }: { theme: DefaultTheme }) => theme.breakpoint.md}) {
      order: 1;
    }

    a {
      color: #1c1c1c !important;

      display: flex;
      align-items: center;
      gap: ${px2rem(8)};
      font-size: ${px2rem(16)};
      line-height: ${px2rem(28)};
      font-weight: 500;
      font-family: 'IBMPlexMono';

      &:hover {
        opacity: 0.8;
        text-decoration: none;
        cursor: pointer;
      }

      .arrow-icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  .buttonContainer {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: ${px2rem(8)};

    .icon {
      width: ${px2rem(34)};
      height: ${px2rem(34)};
      cursor: pointer;

      :hover {
        opacity: 0.8;
      }
    }
  }
`;

const Footer = ({ height }: { height: number }) => {
  return (
    <Wrapper style={{ height }}>
      <p className="text">Open-source software. Made with ❤️ on Bitcoin.</p>
      <div className="footer-right">
        <a href="https://github.com/trustlesscomputer" target="_blank">
          Github
          <img className="arrow-icon" src={IcOutward} />
        </a>
        <a href={'https://explorer.trustless.computer'} target="_blank">
          Explorer
          <img className="arrow-icon" src={IcOutward} />
        </a>
        {/* <div className="buttonContainer">
          <a href="https://github.com/trustlesscomputer" target="_blank">
            <img alt="icon" className="icon" src={IcGithub} />
          </a>
          <a href="https://trustless.computer/discord" target="_blank">
            <img alt="icon" className="icon" src={IcDiscord} />
          </a>
          <a href="https://twitter.com/DappsOnBitcoin" target="_blank">
            <img alt="icon" className="icon" src={IcTwitter} />
          </a>
        </div> */}
      </div>
    </Wrapper>
  );
};

export default Footer;
