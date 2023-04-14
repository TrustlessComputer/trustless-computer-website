import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Wrapper = styled.div`
  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 27px;
    padding-bottom: 27px;

    .socialContainer {
      margin-left: ${px2rem(24)};
      display: flex;
      align-items: center;
      gap: ${px2rem(12)};
    }
  }

  .mainContent {
    min-height: calc(100vh - 82px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      margin-bottom: ${px2rem(36)};
    }

    .title {
      max-width: 600px;
      font-weight: 500;
      font-size: ${px2rem(24)};
      line-height: ${px2rem(34)};
      color: #fff;
      text-align: center;
      margin-bottom: ${px2rem(36)};
    }
  }
`;

export const ConnectWalletButton = styled.button`
  background: linear-gradient(90deg, #ff8008 0%, #ffc837 100%);
  padding: ${px2rem(15)} ${px2rem(24)};
  /* color: #fff; */
  font-size: ${px2rem(16)};
  line-height: ${px2rem(26)};
  font-weight: 400;
  border-radius: 2px;
  position: relative;

  :disabled {
    opacity: 0.8;
  }
`;
