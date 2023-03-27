import styled, { ITheme } from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  /* min-height: 180vh; */
  padding-left: 10vw;
  padding-right: 10vw;

  .container {
    /* height: 92vh; */
    display: flex;
    flex-direction: column;
    padding-top: 8px;
  }

  .content {
    display: flex;
    position: relative;
    height: 80vh;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  .btnFaq {
    height: 13vh;

    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: center;
    margin-bottom: 8px;

    cursor: pointer;

    :hover {
      opacity: 0.8;
    }

    .text {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 26px;

      color: #898989;
    }
  }
  ${({ theme }: { theme: ITheme }) => theme.deprecated_mediaWidth
    .deprecated_upToLarge`
    padding-left: 5vw;
    padding-right: 5vw;
  
    `}

  ${({ theme }: { theme: ITheme }) => theme.deprecated_mediaWidth
    .deprecated_upToMedium`
    padding-left: 40px;
    padding-right: 40px;
      .content {
        height: auto;
        flex-direction: column-reverse;
      }

      .btnFaq {
        margin-top: 32px;
      }
     
    `};
`;

const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  .header {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .headerTitle {
    display: flex;
  }

  ${({ theme }: { theme: ITheme }) => theme.deprecated_mediaWidth
    .deprecated_upToLarge`
    margin-top: 24px;
    `}
`;

const TitleDoc = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  margin-right: 24px;

  :hover {
    opacity: 0.7;
  }

  .text {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.01em;

    color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#898989")};
  }
`;

const CopyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-top: 24px;
  width: 100%;

  position: relative;
  background: #333333;
  padding: 16px 16px;

  .icCopy {
    position: absolute;
    right: 24px;
    bottom: 24px;
    width: 24px;
    height: 24px;

    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
  margin-top: rem(16px);

  .pre {
    height: 480px;
    width: 40vw;
    overflow: auto;
    word-break: normal !important;
    word-wrap: normal !important;
    white-space: pre !important;

    .code {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 200%;
      /* or 250% */
      margin: 16px 16px;

      display: flex;
      align-items: center;
      letter-spacing: -0.01em;

      color: #e5e5e5;

      font-family: Source Code Pro !important;
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }

  ${({ theme }: { theme: ITheme }) => theme.deprecated_mediaWidth
    .deprecated_upToMedium`
      .pre {
          width: 90vw;
      }
  `};
`;

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: -24px;

  ${({ theme }: { theme: ITheme }) => theme.deprecated_mediaWidth
    .deprecated_upToLarge`
      margin-top: 0;
  `};

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    /* line-height: 34px; */
    text-align: center;
    color: #c6c7f8;
  }

  .subTitle {
    font-style: normal;
    font-weight: 500;
    font-size: 56px;
    line-height: 66px;
    color: #ffffff;
    text-align: center;
    margin-top: 16px;
  }

  a {
    text-decoration: none;
  }

  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 19px 48px;
    gap: 10px;

    height: 64px;
    background: #4f43e2;
    border-radius: 2px;
    margin-top: 32px;

    cursor: pointer;

    :hover {
      opacity: 0.7;
    }

    .text {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      color: #ffffff;
      text-align: center;
    }
  }
`;

const FAQContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  margin-top: 140px;
  margin-bottom: 40px;

  .faqContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
  }

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 56px;
    line-height: 66px;

    display: flex;
    align-items: center;
    text-align: center;
    color: #ffffff;
    /* margin-bottom: 25px; */
  }

  ${({ theme }: { theme: ITheme }) => theme.deprecated_mediaWidth
    .deprecated_upToMedium`
      margin-top: 20px;

      .faqContent {
        width: 90%;
      }
    
  `};

  ${({ theme }: { theme: ITheme }) => theme.deprecated_mediaWidth
    .deprecated_upToSmall`
      margin-top: 55px;

      .faqContent {
        width: 96%;
      }
    
  `};
`;

const FAQItem = styled.div<{ isSelected: boolean }>`
  border-bottom: 1px solid #2c2c2c;

  padding-top: 8px;
  padding-bottom: 24px;
  padding-top: 24px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;

    :hover {
      opacity: 0.9;
    }

    .question {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 34px;
      color: #ffffff;
    }

    .icon {
      width: 32px;
      height: 32px;
      transform: ${({ isSelected }) =>
        isSelected ? "rotate(90deg)" : "rotate(0deg)"};
    }
  }

  .answer {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;

    color: #898989;

    margin-top: 8px;
  }
`;

export {
  Container,
  CopyContainer,
  FAQContainer,
  FAQItem,
  LeftContainer,
  RightContainer,
  TitleDoc,
};
