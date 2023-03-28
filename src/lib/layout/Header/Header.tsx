import { Wrapper } from "./Header.styled";
// import IcLogo from "./icons/logo.svg";
import IcDiscord from "./icons/ic_discord.svg";
// import IcGithub from "./icons/ic-github.svg";
import IcTwitter from "./icons/ic_twitter.svg";

const Header = ({ height }: { height: number }) => {
  return (
    <Wrapper style={{ height }}>
      {/* <a href="https://trustless.computer">
        <img alt="logo" src={IcLogo} />
      </a> */}
      <div />
      <div className="row">
        <a href="https://explorer.trustless.computer/">
          <div>
            <p className="networkText">Explorer</p>
          </div>
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
