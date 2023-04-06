import styled from 'styled-components';

export const StyledTextPreview = styled.div`
  &.textPreview {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .textWrapper {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
`;
