import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const StyledTokenProfile = styled.div`
  .table {
    th:nth-child(4),
    td:nth-child(4),
    th:nth-child(5),
    td:nth-child(5),
    th:nth-child(6),
    td:nth-child(6) {
      text-align: right;
    }

    th:nth-child(6),
    td:nth-child(6) {
      max-width: ${px2rem(80)};
    }

    th {
      padding-left: ${px2rem(12)};
      padding-right: ${px2rem(12)};
    }

    td {
      padding-top: ${px2rem(26)};
      padding-bottom: ${px2rem(26)};
      padding-left: ${px2rem(12)};
      padding-right: ${px2rem(12)};
      vertical-align: middle;
    }
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .transfer-button {
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg5};
    padding: ${px2rem(5)} ${px2rem(14)};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: ${px2rem(14)};
    line-height: ${px2rem(24)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.primary.brand};
    font-style: normal;
    border-radius: 2px;
    margin-left: auto;
    /* margin-right: auto; */
  }
`;
