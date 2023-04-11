import px2rem from '@/utils/px2rem';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

export const StyledProfile = styled.div`
  margin-top: ${px2rem(40)};
  row-gap: ${px2rem(40)};
`;

export const TabContainer = styled.div`
  .nav-tabs {
    border: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: ${px2rem(40)};
    gap: ${px2rem(32)};
    flex-wrap: nowrap;
    min-height: ${px2rem(60)};
    overflow-x: scroll;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .nav-link {
      opacity: 0.5;
      border: none;
      transition: 0.2s ease;
      padding: 0;

      &:hover {
        opacity: 0.75;
      }
    }

    .nav-link.active {
      background-color: transparent;
      border: none;
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
      opacity: 1;

      .tab-item::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        background-color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
      }
    }
  }

  .tab-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    position: relative;
    padding-bottom: ${px2rem(12)};
    /* max-height: ${px2rem(30)}; */
  }

  .tab-text {
    font-family: 'IBMPlexMono' !important;
    font-size: ${px2rem(18)};
    font-weight: 500;
  }
`;
