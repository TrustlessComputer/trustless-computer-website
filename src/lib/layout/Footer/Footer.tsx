import { TextSuperMedium } from "lib/components";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    text-align: center;
  }
`;

const Footer = ({ height }: { height: number }) => {
  return (
    <Wrapper style={{ height }}>
      <TextSuperMedium>{new Date().getFullYear()} - Footer</TextSuperMedium>
    </Wrapper>
  );
};

export default Footer;
