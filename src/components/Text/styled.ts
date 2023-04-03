import styled from 'styled-components';

const BaseText = styled.p<{ color: string | undefined; align: string }>`
  color: ${({ color, theme }) => (color ? (theme as any)[color] : theme.white)};
  text-align: ${({ align }) => align};

  // FONT-SIZE
  &.size-extra-small {
    font-size: 11px;
    line-height: 160%;
  }
  &.size-small {
    font-size: 12px;
    line-height: 160%;
  }
  &.size-regular {
    font-size: 14px;
    line-height: 160%;
  }
  &.size-medium {
    font-size: 16px;
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
