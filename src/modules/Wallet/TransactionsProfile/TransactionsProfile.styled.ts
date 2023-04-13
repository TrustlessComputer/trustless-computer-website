import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const StyledTransactionProfile = styled.div`
  .transactions {
    height: 100vh;
  }

  .status {
    text-transform: capitalize;

    &.confirmed {
      color: #00aa6c;
    }
    &.processing {
      color: #4185ec;
    }
    &.pending {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.yellow.b};
    }
  }

  .tableData_item {
    padding-top: ${px2rem(13)};
    padding-bottom: ${px2rem(13)};
    vertical-align: middle;
    font-weight: 500;
  }

  .tx-wrapper {
    display: flex;
    gap: ${px2rem(12)};
    align-items: center;

    .icCopy {
      cursor: pointer;
    }
  }

  .tx-link {
    color: #b1e3ff;
  }
`;
