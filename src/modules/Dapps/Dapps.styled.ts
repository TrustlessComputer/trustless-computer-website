import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const DappsContainer = styled.div``;

export const TabContainer = styled.div`
  .nav-tabs {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${px2rem(40)};
    margin-top: ${px2rem(40)};

    .nav-item {
      button {
        padding: 0;
      }
    }

    .nav-link {
      opacity: 0.5;
      padding: 0 ${px2rem(24)};
      border: none;
      transition: 0.2s ease;

      &:hover {
        opacity: 0.75;
      }
    }

    .nav-link.active {
      background-color: transparent;
      border: none;
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
      opacity: 1;
    }
  }

  .tab-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${px2rem(12)};
    align-items: center;
    width: ${px2rem(110)};
  }

  .tab-text {
    font-family: 'IBMPlexMono' !important;
  }

  .tab-icon {
    width: 68px;
    height: 68px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255);
    background-color: #17171a;
    border-radius: 12px;
  }
`;

export const UploadFileContainer = styled.div`
  padding: ${px2rem(24)} ${px2rem(32)};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${px2rem(40)};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.white};

  .upload_left {
    display: flex;
    gap: ${px2rem(20)};
    align-items: center;
    flex: 1;
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

  .file-uploader {
    opacity: 0;
    position: absolute;
    width: ${px2rem(150)};
    top: 0;
  }
`;
