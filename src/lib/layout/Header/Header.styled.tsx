import styled from "styled-components";

const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border1};
  padding-left: 120px;
  padding-right: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BoltIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-20deg);
  }

  position: relative;
`;

export { BoltIcon, Wrapper };
