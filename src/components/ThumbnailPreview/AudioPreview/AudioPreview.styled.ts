import styled from 'styled-components';

export const StyledAudioPreview = styled.div`
  &.audioPreview {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    :global(svg) {
      margin: auto;
    }
  }
`;
