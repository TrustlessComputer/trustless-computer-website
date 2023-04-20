import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledPhotos = styled.div`
  padding-top: ${px2rem(60)};
  padding-bottom: ${px2rem(60)};
`;

export const TabContainer = styled.div`
  .nav-tabs {
    justify-content: flex-start;
    gap: ${px2rem(32)};
    border-bottom: 1px solid ${({ theme }) => theme.primary['2e']};
  }

  .nav-link.active {
    .photo-tab {
      border-bottom: 1px solid ${({ theme }) => theme.white};
    }
  }

  .photo-tab {
    display: flex;
    align-items: center;
    gap: ${px2rem(8)};
    padding-bottom: ${px2rem(16)};

    p {
      font-family: 'Bandeins Strange Variable' !important;
    }
  }
`;
