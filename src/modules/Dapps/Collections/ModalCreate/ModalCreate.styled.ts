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

    p {
      font-weight: 500;
      font-size: ${px2rem(12)};
      line-height: ${px2rem(20)};
      text-transform: uppercase;
      color: ${({ theme }: { theme: DefaultTheme }) => theme.primary['5b']};
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

export const WrapInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${px2rem(16)};

  .title-input {
    font-weight: 500;
    font-size: ${px2rem(12)};
    line-height: ${px2rem(20)};
    text-transform: uppercase;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.primary['5b']};
    margin-bottom: ${px2rem(4)};
  }

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
  font-weight: 600;
`;
