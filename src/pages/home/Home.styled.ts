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

  .row-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-top: ${px2rem(32)};
    gap: ${px2rem(32)};

    @media screen and (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      gap: ${px2rem(20)};

      a {
        display: inline-block;
      }
    }
  }
`;

const WrapContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${px2rem(40)};
  margin-top: ${px2rem(120)};

  @media screen and (max-width: 768px) {
    margin-top: ${px2rem(60)};
  }
`;

const StepContainer = styled.div<{ isRevert: boolean }>`
  display: flex;
  flex: 1;
  align-self: center;
  align-items: center;
  gap: ${px2rem(120)};
  padding: ${px2rem(80)};
  position: relative;

  background: ${({ isRevert }) => (isRevert ? 'transparent' : '#2e2e2e')};
  flex-direction: ${({ isRevert }) => (isRevert ? 'row-reverse' : 'row')};

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToLarge`
    padding: ${px2rem(60)};
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    flex-direction: column-reverse;
    padding: ${px2rem(40)};
  `}

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    gap: ${px2rem(40)};
    padding: ${px2rem(30)} ${px2rem(20)};
  }
`;

const LeftStep = styled.img`
  display: flex;
  width: 50%;
  max-height: ${px2rem(300)};
  object-fit: contain;

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    width: 100%;
  `}
`;

const RightStep = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  .name {
    font-weight: 400;
    font-size: ${px2rem(22)};
    line-height: ${px2rem(32)};
    text-transform: uppercase;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.bg4};
  }

  .text {
    font-weight: 500;
    font-size: ${px2rem(34)};
    line-height: ${px2rem(44)};
    font-family: 'IBMPlexMono' !important;
  }

  .desc {
    font-weight: 500;
    font-size: ${px2rem(20)};
    line-height: ${px2rem(30)};
    color: #e5e5e5;
    margin-top: ${px2rem(12)};
    margin-bottom: ${px2rem(32)};
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    width: 100%;
  `}
`;

const Button = styled.div`
  padding: ${px2rem(16)} ${px2rem(24)};
  background: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  border-radius: ${px2rem(2)};
  width: fit-content;
  font-family: 'IBMPlexMono' !important;

  font-weight: 500;
  font-size: ${px2rem(18)};
  line-height: ${px2rem(26)};
  align-items: center;
  letter-spacing: 0.01em;
  cursor: pointer;
`;

export { Container, WrapContainer, StepContainer, LeftStep, RightStep, Button };
