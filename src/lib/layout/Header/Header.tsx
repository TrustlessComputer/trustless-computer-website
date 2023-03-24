import { Wrapper } from "./Header.styled";

const Header = ({ height }: { height: number }) => {
  return (
    <Wrapper style={{ height }}>
      {/* <BoltIcon>
        <Image size="40px" src={BoltLogo} />
      </BoltIcon> */}
      {/* <a href="https://explorer.trustless.computer">
        <div>
          <p className="networkText">Explorer</p>
        </div>
      </a> */}
    </Wrapper>
  );
};

export default Header;
