import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  transform: translateX(100%);

  .inner {
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg1};
    width: 100vw;
    height: 100vh;
    gap: ${px2rem(8)};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: ${px2rem(24)};
    padding-right: 11%;
  }

  .btnMenuMobile {
    margin-bottom: ${px2rem(20)};

    img {
      width: 24px;
      height: 24px;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    .inner {
      padding-right: 7%;
    }
  `}
`;

export { Wrapper };
