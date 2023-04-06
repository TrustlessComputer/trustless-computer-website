import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const DappsContainer = styled.div``;

export const TabContainer = styled.div`
  margin-bottom: ${px2rem(40)};

  .nav-tabs {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    .nav-link {
      opacity: 0.5;
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
    gap: 5px;
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
    padding: ${px2rem(11)} ${px2rem(36)};
  }

  .file-uploader {
    opacity: 0;
    position: absolute;
    width: ${px2rem(150)};
    top: 0;
  }
`;

export const NamesContainer = styled.div`
  padding: ${px2rem(24)} ${px2rem(32)};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${px2rem(40)};
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
    padding: ${px2rem(11)} ${px2rem(36)};
  }

  .file-uploader {
    opacity: 0;
    position: absolute;
    width: ${px2rem(150)};
    top: 0;
  }
`;
