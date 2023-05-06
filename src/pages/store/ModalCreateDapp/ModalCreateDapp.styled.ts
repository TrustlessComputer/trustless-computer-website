import px2rem from '@/utils/px2rem';
import { Modal } from 'react-bootstrap';
import styled, { DefaultTheme } from 'styled-components';

export const StyledModalUpload = styled(Modal)`
  &.modal {
    --bs-modal-color: ${({ theme }) => theme.bg1};
    --bs-modal-width: 796px;
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
    padding: ${px2rem(32)};
    padding-top: ${px2rem(7)};
  }

  .modal-footer {
    border-top: none;
  }

  .dropZone {
    width: 100%;
    margin-bottom: ${px2rem(16)};
    cursor: pointer;
  }

  .upload-wrapper {
    padding: ${px2rem(12)};
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${px2rem(8)};

    background: #ececed;
    border: 1px dashed #cecece;
    border-radius: 2px;
    height: 84px;

    p {
      font-weight: 400;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(26)};
      color: #1c1c1c;
    }
  }

  .file-upload-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${px2rem(13)};
  }

  .confirm-btn {
    width: 100%;

    .confirm-text {
      padding-top: ${px2rem(11)};
      padding-bottom: ${px2rem(11)};
    }
  }
`;

export const WrapBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(24)};

  .row-inputs {
    display: flex;
    flex-direction: row;
    gap: ${px2rem(24)};
    width: 100%;
  }
`;

export const WrapInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .title-input {
    font-weight: 500;
    font-size: ${px2rem(12)};
    line-height: ${px2rem(20)};
    color: #5b5b5b;
    margin-bottom: ${px2rem(4)};
  }

  .input {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(16)};
    font-weight: 400;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(26)};
    padding: ${px2rem(11)} ${px2rem(14)};
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
  font-weight: 500;
`;
