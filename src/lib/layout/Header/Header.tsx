import BoltLogo from "lib/assets/logos/ic_bolt.svg";
import { Image } from "rebass";

import { BoltIcon, Wrapper } from "./Header.styled";

const Header = ({ height }: { height: number }) => {
  return (
    <Wrapper style={{ height }}>
      <BoltIcon>
        <Image size="40px" src={BoltLogo} />
      </BoltIcon>
    </Wrapper>
  );
};

export default Header;
