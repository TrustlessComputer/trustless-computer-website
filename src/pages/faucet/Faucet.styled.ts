import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: ${px2rem(50)};

  .wrap-content {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    max-width: 800px;
    min-width: 345px;
  }

  .title {
    font-weight: 500;
    font-size: 56px;
    line-height: 66px;
    align-items: center;
    align-self: center;
    letter-spacing: -0.02em;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    font-family: 'IBMPlexMono';
  }

  .subTitle {
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;
    text-align: center;
    margin-top: ${px2rem(16)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text3};
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    
  `};
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${px2rem(48)};
  gap: ${px2rem(36)};
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border2};
  border-radius: 4px;

  margin-top: ${px2rem(60)};
`;

const Step = styled.div<{ active: boolean; isEnd: boolean }>`
  border-bottom: 1px solid
    ${({ theme, isEnd }: { theme: DefaultTheme; isEnd: boolean }) => (isEnd ? 'transparent' : theme.border3)};
  padding-bottom: ${({ isEnd }) => (isEnd ? '0px' : '24px')};

  opacity: ${({ active }) => (active ? 1 : 0.3)};

  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};

  .title {
    font-weight: 500;
    font-size: ${px2rem(20)};
    line-height: ${px2rem(30)};
    letter-spacing: -0.01em;
  }

  .decs {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    margin-top: ${px2rem(8)};
  }

  .error {
    font-weight: 400;
    font-size: ${px2rem(14)};
    line-height: ${px2rem(24)};
    margin-top: ${px2rem(8)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text6};
  }

  .success {
    font-weight: 400;
    font-size: ${px2rem(14)};
    line-height: ${px2rem(24)};
    margin-top: ${px2rem(8)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.green.c};
  }

  .link {
    text-decoration: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    margin-top: ${px2rem(8)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    cursor: pointer;

    :hover {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text4};
    }
  }
`;

const PostStep = styled.div<{ disable: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${px2rem(8)};
  gap: ${px2rem(16)};

  opacity: ${({ disable }) => (!disable ? 1 : 0.3)};

  pointer-events: ${({ disable }) => (!disable ? 'auto' : 'none')};

  .postBtn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${px2rem(11)} ${px2rem(14)};
    gap: 6px;
    min-width: ${px2rem(98)};

    background: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    border-radius: 2px;

    :hover {
      background: ${({ theme }: { theme: DefaultTheme }) => theme.bg4};
    }

    :disabled {
      background: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    }

    .text {
      font-weight: 500;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(26)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text7};
    }

    .loading {
      padding: ${px2rem(11)};
    }
  }

  .inputContainer {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border3};
    border-radius: 2px;

    .input {
      padding: ${px2rem(11)} ${px2rem(14)};

      font-weight: 400;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(26)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
      width: 100%;
    }
  }
`;

export { Container, StepBox, Step, PostStep };
