import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const StyledTransactionProfile = styled.div`
  .transactions {
    min-height: 50vh;
  }

  .loading {
    min-height: ${px2rem(200)};
    width: 100%;
    display: grid;
    place-items: center;
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
    gap: ${px2rem(6.5)};
    align-items: center;

    .icCopy {
      width: ${px2rem(15)};
      height: ${px2rem(15)};
      cursor: pointer;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }

  .tx-link {
    color: #b1e3ff;
  }

  .table {
    th:nth-child(5),
    td:nth-child(5),
    th:nth-child(6),
    td:nth-child(6) {
      text-align: right;
    }
  }
`;
