import styled, { DefaultTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 50px;
  width: 30%;
  max-width: 600px;
  min-width: 345px;

  .title {
    font-weight: 500;
    font-size: 56px;
    line-height: 66px;
    align-items: center;
    align-self: center;
    letter-spacing: -0.02em;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  }

  .subTitle {
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;
    text-align: center;
    margin-top: 16px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text3};
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    
  `};
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px;
  gap: 36px;
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border2};
  border-radius: 4px;

  margin-top: 60px;
`;

const Step = styled.div<{ active: boolean; isEnd: boolean }>`
  border-bottom: 1px solid
    ${({ theme, isEnd }: { theme: DefaultTheme; isEnd: boolean }) => (isEnd ? 'transparent' : theme.border3)};
  padding-bottom: ${({ isEnd }) => (isEnd ? '0px' : '24px')};

  opacity: ${({ active }) => (active ? 1 : 0.3)};

  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};

  .title {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.01em;
  }

  .decs {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    margin-top: 8px;
  }

  .post {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
    gap: 16px;
  }

  .postBtn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 11px 20px 11px 16px;
    gap: 6px;

    height: 48px;

    background: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    border-radius: 2px;

    .text {
      font-weight: 500;
      font-size: 16px;
      line-height: 26px;
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text7};
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
      padding: 11px 14px;

      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
      width: 100%;
    }
  }

  .error {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    margin-top: 8px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text6};
  }
`;

export { Container, StepBox, Step };
