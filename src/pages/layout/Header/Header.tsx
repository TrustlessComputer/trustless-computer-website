import { Wrapper } from './Header.styled';
import IcDiscord from './icons/ic_discord.svg';
// import IcGithub from "./icons/ic-github.svg";
import IcTwitter from './icons/ic_twitter.svg';
import IcLogo from './icons/logo.svg';

const Header = ({ height }: { height: number }) => {
  return (
    <Wrapper style={{ height }}>
      <a href="/">
        <img alt="logo" src={IcLogo} />
      </a>
      <div className="rowLink">
        <a className="networkText" href="https://nft.trustless.computer/">
          NFTs
        </a>
        <a className="networkText" href="https://explorer.trustless.computer/">
          Explorer
        </a>
        <a className="iconContainer" href="https://discord.gg/tscNGxEw2s">
          <img alt="icon" className="icon" src={IcDiscord} />
        </a>
        <a className="iconContainer" href="https://twitter.com/DappsOnBitcoin">
          <img alt="icon" className="icon" src={IcTwitter} />
        </a>
      </div>
    </Wrapper>
  );
};

export default Header;