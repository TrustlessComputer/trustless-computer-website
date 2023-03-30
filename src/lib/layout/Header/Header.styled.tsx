import styled, { ITheme } from "styled-components";

const Wrapper = styled.div`
  /* border-bottom: 1px solid #2e2e2e; */
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
  }

  .networkText {
    cursor: pointer;

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    margin-right: 12px;

    color: #898989;

    :hover {
      opacity: 0.7;
    }
  }

  .iconContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
  }

  .icon {
    width: 18px;
    height: 18px;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
`;

export { Wrapper };
