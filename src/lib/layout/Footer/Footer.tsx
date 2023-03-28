import styled, { ITheme } from "styled-components";

// import IcDiscord from "./icons/ic-discord.svg";
// import IcGithub from "./icons/ic-github.svg";
// import IcTwitter from "./icons/ic-twitter.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 80px;
  padding-right: 80px;
  margin-top: 40px;

  ${({ theme }: { theme: ITheme }) => theme.deprecated_mediaWidth
    .deprecated_upToExtraSmall`
      padding-left: 8px;
      padding-right: 8px;
  `};

  .text {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    color: #ffffff;
  }

  .buttonContainer {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 8px;

    .icon {
      width: 34px;
      height: 34px;
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
      {/* <div className="buttonContainer">
        <a href="https://github.com/trustlesscomputer">
          <img alt="icon" className="icon" src={IcGithub} />
        </a>
        <a href="https://discord.gg/tscNGxEw2s">
          <img alt="icon" className="icon" src={IcDiscord} />
        </a>
        <a href="https://twitter.com/DappsOnBitcoin">
          <img alt="icon" className="icon" src={IcTwitter} />
        </a>
      </div> */}
    </Wrapper>
  );
};

export default Footer;
