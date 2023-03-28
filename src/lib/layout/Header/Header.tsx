import { Wrapper } from "./Header.styled";
import IcLogo from "./icons/logo.svg";

const Header = ({ height }: { height: number }) => {
  return (
    <Wrapper style={{ height }}>
      <a href="https://trustless.computer">
        <img alt="logo" src={IcLogo} />
      </a>
      <div />
      {/* <a href="https://explorer.trustless.computer">
        <div>
          <p className="networkText">Explorer</p>
        </div>
      </a> */}
    </Wrapper>
  );
};

export default Header;
