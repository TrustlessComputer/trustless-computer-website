import styled from 'styled-components';

export const StyledPDFPreview = styled.div`
  &.pdfPreview {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;

    .centerContainer {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $black-10;

      .errorMessage {
        font-size: rem(16px);
        line-height: rem(26px);
        color: $black-100;
        font-weight: 500;
      }
    }
  }
`;
