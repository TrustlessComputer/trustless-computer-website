import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

const BaseText = styled.p<{ color: string | undefined; align: string }>`
  color: ${({ color, theme }) => (color ? (theme as any)[color] : theme.white)};
  text-align: ${({ align }) => align};

  // FONT-SIZE
  &.size-extra-small {
    font-size: ${px2rem(11)};
    line-height: 160%;
  }
  &.size-small {
    font-size: ${px2rem(12)};
    line-height: 160%;
  }
  &.size-regular {
    font-size: ${px2rem(14)};
    line-height: 160%;
  }
  &.size-medium {
    font-size: ${px2rem(16)};
    line-height: 160%;
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
