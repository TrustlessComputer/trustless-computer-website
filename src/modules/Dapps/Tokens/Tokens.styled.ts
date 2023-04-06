import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledTokens = styled.div`
  .table {
    th:first-of-type {
      max-width: ${px2rem(50)};
    }

    th:nth-child(4),
    td:nth-child(4),
    th:nth-child(5),
    td:nth-child(5) {
      text-align: right;
    }

    td {
      padding-top: ${px2rem(26)};
      padding-bottom: ${px2rem(26)};
    }
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
