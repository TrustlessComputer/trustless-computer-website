import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';
import Button from '@/components/Button';

export const NamesContainer = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  align-self: center;
  padding: ${px2rem(24)} ${px2rem(32)};
  /* background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg2}; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: ${px2rem(40)}; */
  color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  margin-top: ${px2rem(40)};

  .space {
    height: 20px;
  }
  .upload_left {
    display: flex;
    gap: ${px2rem(20)};
    align-items: center;
  }

  .upload_right {
    position: relative;
    overflow: hidden;
  }

  .upload_title {
    margin-bottom: ${px2rem(8)};
  }

  .button-text {
    font-family: 'IBMPlexMono' !important;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  margin-top: ${px2rem(44)};
`;

export const SubmitButton = styled(Button)`
  width: ${px2rem(130)};

  p {
    padding: unset !important;
  }

  :disabled {
    opacity: 0.5;
  }
`;
