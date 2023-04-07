import styled from 'styled-components';

export const UnknownFormatPreview = styled.div`
  &.unknownFormatPreview {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .textWrapper {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
`;
