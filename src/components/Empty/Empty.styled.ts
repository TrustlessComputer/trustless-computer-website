import styled from 'styled-components';
import { TEmpty } from '.';

export const StyledEmpty = styled.div<{ isTable: boolean }>`
  &.notFound {
    display: grid;
    place-items: center;
    position: relative;

    &_image {
      margin-bottom: rem(32px);
    }

    h5 {
      color: $black-40-solid;
      font-weight: 500 !important;
    }
  }
`;
