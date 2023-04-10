import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

import IcDiscord from '@/assets/icons/ic_discord.svg';
import IcTwitter from '@/assets/icons/ic_twitter.svg';
import IcGithub from '@/assets/icons/ic_github.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${px2rem(140)};

  .text {
    font-style: normal;
    font-weight: 500;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(26)};
    margin-right: ${px2rem(16)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
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
      <div className="buttonContainer">
        <a href="https://github.com/trustlesscomputer" target="_blank">
          <img alt="icon" className="icon" src={IcGithub} />
        </a>
        <a href="https://discord.com/channels/1052411011036090458/1094649301210239086" target="_blank">
          <img alt="icon" className="icon" src={IcDiscord} />
        </a>
        <a href="https://twitter.com/DappsOnBitcoin" target="_blank">
          <img alt="icon" className="icon" src={IcTwitter} />
        </a>
      </div>
    </Wrapper>
  );
};

export default Footer;
