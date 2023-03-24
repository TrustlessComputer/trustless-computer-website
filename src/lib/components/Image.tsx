import styled from "styled-components";

const StyledImage = styled.image``;

const Image = (props: HTMLImageElement & any) => {
  return <StyledImage {...props} />;
};

export { Image };
