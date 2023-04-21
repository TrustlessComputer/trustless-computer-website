import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: ${px2rem(68)};

  .title {
    font-size: ${px2rem(48)};
    line-height: ${px2rem(58)};
    font-weight: 500;
    letter-spacing: -0.05em;
    text-align: center;
    font-family: 'IBMPlexMono' !important;
  }

  .subTitle {
    font-weight: 500;
    font-size: ${px2rem(24)};
    line-height: ${px2rem(34)};
    text-align: center;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text3};
    margin-top: ${px2rem(16)};
  }
`;

const WrapContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: ${px2rem(80)};

  .congra {
    font-family: 'IBMPlexMono' !important;

    font-weight: 700;
    font-size: ${px2rem(30)};
    line-height: ${px2rem(40)};

    letter-spacing: -0.03em;
    padding-top: ${px2rem(80)};

    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  }
`;

const StepContainer = styled.div<{ isRevert: boolean }>`
  display: flex;
  align-self: center;
  align-items: center;
  width: 100%;

  padding: ${px2rem(60)};
  position: relative;
  flex-direction: row;
  justify-content: space-between;

  background: ${({ isRevert }) => (isRevert ? 'transparent' : '#2e2e2e')};

  .left-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(48)};
  }

  .name {
    font-weight: 400;
    font-size: ${px2rem(24)};
    line-height: ${px2rem(34)};
    text-transform: uppercase;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.primary.brand};
    text-align: center;

    padding: ${px2rem(16)} ${px2rem(24)};

    background: #f9d03f;
    border-radius: ${px2rem(60)};
  }

  .text {
    font-size: ${px2rem(30)};
    line-height: ${px2rem(40)};
    font-weight: 600;
    font-family: 'IBMPlexMono' !important;
  }

  .desc {
    font-weight: 500;
    font-size: ${px2rem(20)};
    line-height: ${px2rem(30)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.bg4};
    width: 70%;
    margin-top: ${px2rem(4)};
  }

  .normal-step {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .share-link {
    font-weight: 500;
    font-size: ${px2rem(18)};
    line-height: ${px2rem(26)};

    color: #ff8008;

    text-decoration: underline !important;
    margin-top: ${px2rem(20)};
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
      flex-direction: column;
      padding: ${px2rem(40)};
      gap: ${px2rem(32)};

      .desc {
        width: 100%;
      }
    
  `};
`;

const Button = styled.div`
  padding: ${px2rem(16)} ${px2rem(24)};
  background: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  border-radius: ${px2rem(2)};
  width: fit-content;
  font-family: 'IBMPlexMono' !important;

  gap: ${px2rem(10)};
  background: linear-gradient(90deg, #ff8008 0%, #ffc837 100%);
  border-radius: 8px;
  text-decoration: none !important;
  width: fit-content;

  font-weight: 500;
  font-size: ${px2rem(18)};
  line-height: ${px2rem(26)};
  align-items: center;
  letter-spacing: 0.01em;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

export { Container, WrapContainer, StepContainer, Button };
