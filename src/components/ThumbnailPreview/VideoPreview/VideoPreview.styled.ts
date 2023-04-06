import styled from 'styled-components';

export const StyledVideoPreview = styled.div`
  &.videoPreview {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    > video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
