import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const StyledTransactionProfile = styled.div`
  .status {
    text-transform: capitalize;

    &.confirmed {
      color: #00aa6c;
    }
    &.resume {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.red};
    }
    &.pending {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.yellow.b};
    }
  }

  .tableData_item {
    padding-top: ${px2rem(13)};
    padding-bottom: ${px2rem(13)};
  }

  .tx-wrapper {
    display: flex;
    gap: ${px2rem(12)};
    align-items: center;

    .icCopy {
      cursor: pointer;
    }
  }
`;