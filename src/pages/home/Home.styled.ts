import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  .wrap-container {
    min-height: 700px;
    height: 95vh;
    display: flex;
    flex-direction: column;
    padding-top: 8px;
  }

  .wrap-content {
    display: flex;
    position: relative;
    flex: 1;
    min-height: 600px;
    height: 88vh;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  .btnFaq {
    height: 12vh;

    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: center;

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

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    .wrap-container {
      min-height: auto;
      height: auto;
    }

    .wrap-content {
      min-height: auto;

      height: auto;
      flex-direction: column-reverse;
      margin-top: 32px;
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

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToLarge`
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

    color: ${({ isSelected, theme }) => (isSelected ? theme.white : theme.text2)};
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
  background: ${({ theme }: { theme: DefaultTheme }) => theme.bg2};
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
    /* width: 40vw; */
    overflow: auto;
    word-break: normal !important;
    word-wrap: normal !important;
    white-space: pre !important;

    .code {
      font-style: normal;
      font-weight: 500;
      font-size: ${px2rem(14)};
      line-height: 200%;
      /* or 250% */
      margin: 16px 16px;

      display: flex;
      align-items: center;
      letter-spacing: -0.01em;

      color: ${({ theme }: { theme: DefaultTheme }) => theme.text3};

      font-family: Source Code Pro !important;
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
      .pre {
          width: 90vw;
      }
  `};
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  /* margin-top: -24px; */
  width: 100%;

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    /* line-height: 34px; */
    text-align: center;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text4};
    width: max-content;
  }

  .subTitle {
    font-style: normal;
    font-weight: 500;
    font-size: ${px2rem(45)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    text-align: center;
    margin-top: 16px;
    line-height: 66px;
    font-family: 'IBMPlexMono' !important;
  }

  a {
    text-decoration: none !important;
  }

  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 19px 48px;
    gap: 10px;

    height: 64px;
    background: ${({ theme }: { theme: DefaultTheme }) => theme.text5};
    border-radius: 2px;
    margin-top: 32px;

    cursor: pointer;

    :hover {
      opacity: 0.7;
    }

    .text-build {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
      text-align: center;
      font-family: 'IBMPlexMono' !important;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToLarge`
      margin-top: 0;
     
      .title {
        font-size: 20px;
      }
    
      .subTitle {
        font-size: 44px;
        line-height: 56px;
      }
  `};
`;

const FAQContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  /* min-height: 80vh; */
  margin-top: 40px;
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
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    /* margin-bottom: 25px; */
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
      margin-top: 20px;

      .faqContent {
        width: 90%;
      }
    
  `};

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`

      .faqContent {
        width: 96%;
      }
    
  `};
`;

const StyledFAQItem = styled.div<{ isSelected: boolean }>`
  border-bottom: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border1};

  padding-top: 8px;
  padding-bottom: 24px;
  padding-top: 24px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;

    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    :hover {
      opacity: 0.9;
    }

    .question {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 34px;
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    }

    .icon {
      width: 32px;
      height: 32px;
      transform: rotate(0deg);
      overflow: hidden;
      transition: all 0.15s ease-out;
      ${({ isSelected }) => isSelected && `transform: rotate(90deg)`};
    }
  }

  .answer {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;

    color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};

    margin-top: 8px;
  }
`;

export { Container, CopyContainer, FAQContainer, LeftContainer, RightContainer, StyledFAQItem, TitleDoc };
