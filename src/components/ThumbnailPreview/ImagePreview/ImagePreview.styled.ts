import styled from 'styled-components';

export const StyledImagePreview = styled.div`
  &.imagePreview {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
