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
    display: block;
    position: relative;
    overflow: auto;
    padding: {
      top: ${px2rem(120)};
      left: ${px2rem(16)};
      right: ${px2rem(16)};
      bottom: ${px2rem(40)};
    }
  }
`;

export { Wrapper };
