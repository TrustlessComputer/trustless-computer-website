import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const Grid = styled.div<{ repeat: string }>`
  display: grid;
  justify-items: center;

  grid-gap: ${px2rem(24)};
  grid-template-columns: ${({ repeat }) => repeat};
`;
