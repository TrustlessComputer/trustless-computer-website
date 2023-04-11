import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const StyledUserInfo = styled.div`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.primary['2e']};
  width: 100vw;
  margin-left: -${px2rem(32)};
  padding: ${px2rem(24)} ${px2rem(32)};

  .info {
    display: flex;
    align-items: center;
    gap: ${px2rem(20)};
  }

  .avatar > div {
    border-radius: 50% !important;
  }

  .address {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};

    .eth_address {
      display: flex;
      align-items: center;
      gap: ${px2rem(8)};

      h5 {
        font-weight: 600;
      }
    }
  }
`;
