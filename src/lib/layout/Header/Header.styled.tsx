import styled, { ITheme } from "styled-components";

const Wrapper = styled.div`
  border-bottom: 1px solid #2e2e2e;
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: unset;
  }

  ${({ theme }: { theme: ITheme }) => theme.deprecated_mediaWidth
    .deprecated_upToExtraSmall`
      padding-left: 8px;
      padding-right: 8px;
  `};

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 42px;
  }

  .networkText {
    cursor: pointer;

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;

    color: #898989;

    :hover {
      opacity: 0.7;
    }
  }
`;

export { Wrapper };
