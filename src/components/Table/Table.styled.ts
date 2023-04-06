import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const StyledTable = styled.div`
  .table {
    position: relative;
    overflow: scroll;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};

    & > :not(caption) > * > * {
      padding: {
        top: ${px2rem(26)};
        bottom: ${px2rem(26)};
        right: 0;
        left: 0;
      }
    }

    .tableHead {
      border-bottom: 1px solid $black;

      &_item {
        font-weight: 500;
        line-height: ${px2rem(24)};
        color: #b6b6b6;
        position: sticky;
        top: 0;
        /* background-color: ${({ theme }: { theme: DefaultTheme }) => theme.white}; */
        z-index: 10;
        font-size: 14px;

        @media screen and (max-width: ${({ theme }: { theme: DefaultTheme }) => theme.breakpoint.lg}) {
          font-size: ${px2rem(14)};
        }

        @media screen and (max-width: ${({ theme }: { theme: DefaultTheme }) => theme.breakpoint.sm}) {
          white-space: nowrap;
        }
      }

      .tableData {
        border-bottom: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.primary.light};

        &:hover {
          background-color: ${({ theme }: { theme: DefaultTheme }) => theme.primary.light};
        }

        &_item {
          padding-top: ${px2rem(26)};
          padding-bottom: ${px2rem(26)};
          color: ${({ theme }: { theme: DefaultTheme }) => theme.primary[333]};
          line-height: ${px2rem(26)};
          font-weight: 600;
          vertical-align: middle;
          font-size: 18px;
        }
      }
    }

    .empty {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: ${px2rem(50)};

      .content {
        margin-top: ${px2rem(16)};
      }

      tr > div {
        position: absolute;
        top: 80px;
      }
    }
  }
`;
