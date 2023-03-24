import { X } from "react-feather";
import styled from "styled-components";

import { RowBetween } from "../Row";
import { TextMedium } from "../Text";

const Wrapper = styled(RowBetween)`
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 8px;
  .title-label {
  }
`;

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  color: ${({ theme }) => theme.icon1};
  cursor: pointer;
  :hover {
    opacity: ${({ theme }) => theme.opacity.hover};
  }
`;

const HeaderModal = ({
  title,
  onDismiss,
}: {
  title: string;
  onDismiss: () => void;
}) => {
  return (
    <Wrapper>
      <TextMedium className="title-label">{title}</TextMedium>
      <CloseIcon onClick={onDismiss} />
    </Wrapper>
  );
};

export default HeaderModal;
