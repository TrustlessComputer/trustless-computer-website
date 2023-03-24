import React from "react";
import styled from "styled-components";

const StyledBaseButton = styled.button`
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 100px;
`;

const StyledPrimaryButton = styled(StyledBaseButton)`
  background-color: ${({ theme }) => theme.btn1};
  width: 100%;
  min-height: 56px;
  :hover {
    opacity: ${({ theme }) => theme.opacity.hover};
  }
`;

const StyledSecondaryButton = styled(StyledBaseButton)``;

const PrimaryButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return <StyledPrimaryButton {...props} />;
};

const SecondaryButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return <StyledSecondaryButton {...props} />;
};

export { PrimaryButton, SecondaryButton, StyledBaseButton };
