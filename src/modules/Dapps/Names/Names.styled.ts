import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const NamesContainer = styled.div`
  padding: ${px2rem(24)} ${px2rem(32)};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: ${px2rem(40)}; */
  color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  margin-top: ${px2rem(40)};

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
    padding: ${px2rem(11)} ${px2rem(36)};
  }
`;

export const FormContainer = styled.div`
  margin-top: ${px2rem(24)};

  .form {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .input {
    display: flex;
    justify-content: center;
    align-content: center;
    max-width: ${px2rem(550)};
    width: 100%;
    height: ${px2rem(60)};

    input {
      border: 1px solid #cecece;
      border-radius: 2px;
      padding: ${px2rem(19)} ${px2rem(24)};
      font-weight: 400;
      font-size: ${px2rem(16)};
      color: #ffffff;
      width: 100%;
    }
  }

  .btn {
    margin-left: ${px2rem(24)};
    padding: 0;
    height: ${px2rem(60)};

    button {
      height: 100%;
    }

    .button-text {
      padding: ${px2rem(11)} ${px2rem(36)};
    }
  }
`;
