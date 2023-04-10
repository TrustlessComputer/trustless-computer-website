import px2rem from '@/utils/px2rem';
import { Modal } from 'react-bootstrap';
import styled, { DefaultTheme } from 'styled-components';

export const StyledModalUpload = styled(Modal)`
  &.modal {
    --bs-modal-color: ${({ theme }) => theme.bg1};
  }

  .modal-content {
    border-radius: 2px;
  }

  .modal-header {
    border-bottom: none;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    padding-top: ${px2rem(18)};
    padding-right: ${px2rem(18)};
  }

  .modal-body {
    padding-top: ${px2rem(7)};
  }

  .modal-footer {
    border-top: none;
  }

  /* ======= Custom modal ========== */

  .dropZone {
    margin-top: ${px2rem(24)};

    width: 100%;
  }

  .preview-wrapper {
    .thumbnail-wrapper {
      min-height: ${px2rem(200)};
      position: relative;
    }

    img {
      background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg5};
      max-height: ${px2rem(281)};
      width: 100%;
      object-fit: contain;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: ${px2rem(12)};
      cursor: pointer;
    }
  }

  .error-text {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text6};
  }
  .file-upload-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${px2rem(13)};
  }

  .upload-fee {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${px2rem(16)};
    padding: ${px2rem(16)};
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg5};
    border: 1px solid;
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};
    margin-bottom: ${px2rem(40)};

    p {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text7};
    }
  }

  .confirm-btn {
    width: 100%;

    .confirm-text {
      padding-top: ${px2rem(11)};
      padding-bottom: ${px2rem(11)};
    }
  }
`;

export const WrapInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${px2rem(16)};

  .input {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${px2rem(20)};
    gap: ${px2rem(16)};
    font-weight: 400;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(26)};

    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border3};

    :hover {
      border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.primary.brand};
    }
  }

  .error {
    font-weight: 400;
    font-size: ${px2rem(14)};
    line-height: ${px2rem(24)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text6};
  }
`;

export const Title = styled.h5`
  margin-bottom: ${px2rem(24)};
`;
