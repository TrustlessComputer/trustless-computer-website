import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

const BaseText = styled.p<{ color: string | undefined; align: string; maxWidth: string | number }>`
  color: ${({ color, theme }) => (color ? (theme as any)[color] : theme.white)};
  text-align: ${({ align }) => align};
  max-width: ${({ maxWidth }) => maxWidth};
  line-height: 150%;

  // FONT-SIZE
  &.size-extra-small {
    font-size: ${px2rem(11)};
  }
  &.size-small {
    font-size: ${px2rem(12)};
  }
  &.size-regular {
    font-size: ${px2rem(14)};
  }
  &.size-medium {
    font-size: ${px2rem(16)};
  }
  &.size-large {
    font-size: ${px2rem(18)};
  }
  &.size-20 {
    font-size: ${px2rem(20)};
  }
  &.size-24 {
    font-size: ${px2rem(24)};
  }
  &.size-48 {
    font-size: ${px2rem(48)};
  }
  // FONT-WEIGHT
  &.weight-bold {
    font-weight: 700;
  }
  &.weight-semibold {
    font-weight: 600;
  }
  &.weight-medium {
    font-weight: 500;
  }
  &.weight-regular {
    font-weight: 400;
  }
  &.weight-light {
    font-weight: 300;
  }
`;

export { BaseText };
