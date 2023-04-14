import { MainModal } from '@/components/Modal/MainModal.styled';
import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledTransferModal = styled(MainModal)`
  * {
    font-family: 'Bandeins Strange Variable' !important;
  }

  .label {
    font-size: ${px2rem(12)};
    font-weight: 500;
    margin-bottom: ${px2rem(6)};
    color: ${({ theme }) => theme.primary['5b']};
  }

  .divider {
    margin-top: ${px2rem(16)};
    margin-bottom: ${px2rem(16)};
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.bg4};
  }

  .est-fee {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${px2rem(24)};
  }

  .est-fee-value {
    display: flex;
    align-items: center;
    gap: ${px2rem(14)};
  }

  .transfer-btn {
    width: 100%;
    margin-top: ${px2rem(8)};

    .transfer-text {
      padding-top: ${px2rem(11)};
      padding-bottom: ${px2rem(11)};
    }
  }
`;
