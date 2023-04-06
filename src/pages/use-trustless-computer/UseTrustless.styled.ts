import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  padding-top: ${px2rem(60)};

  .title {
    font-size: ${px2rem(54)};
    line-height: ${px2rem(64)};
    text-align: center;
  }

  .subTitle {
    font-weight: 400;
    font-size: ${px2rem(24)};
    line-height: ${px2rem(34)};
    text-align: center;
    margin-top: ${px2rem(16)};
  }
`;

const WrapContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StepContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(120)};
  margin-top: ${px2rem(120)};

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    flex-direction: column-reverse;
    gap: ${px2rem(60)};
    margin-top: ${px2rem(100)};
  `}
`;

const LeftStep = styled.img`
  display: flex;
  width: 50%;
  max-height: ${px2rem(500)};

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
    font-size: ${px2rem(24)};
    line-height: ${px2rem(32)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.bg4};
  }

  .text {
    font-size: ${px2rem(54)};
    line-height: ${px2rem(64)};
  }

  .desc {
    font-weight: 400;
    font-size: ${px2rem(20)};
    line-height: ${px2rem(30)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.bg4};
    margin-top: ${px2rem(32)};
    margin-bottom: ${px2rem(42)};
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    width: 100%;
  `}
`;

const Link = styled.a`
  padding: ${px2rem(16)} ${px2rem(24)};
  background: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  border-radius: ${px2rem(2)};
  text-decoration: none;
  width: fit-content;

  font-weight: 500;
  font-size: ${px2rem(18)};
  line-height: ${px2rem(26)};
  align-items: center;
  letter-spacing: 0.01em;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary.brand};

  :hover {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.bg4};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.black};
  }
`;

const Button = styled.div`
  padding: ${px2rem(16)} ${px2rem(24)};
  background: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  border-radius: ${px2rem(2)};
  width: fit-content;

  font-weight: 500;
  font-size: ${px2rem(18)};
  line-height: ${px2rem(26)};
  align-items: center;
  letter-spacing: 0.01em;
  cursor: pointer;
`;

export { Container, WrapContainer, StepContainer, LeftStep, RightStep, Link, Button };
