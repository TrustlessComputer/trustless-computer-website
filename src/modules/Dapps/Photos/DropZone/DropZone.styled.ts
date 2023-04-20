import px2rem from '@/utils/px2rem';
import styled, { DefaultTheme } from 'styled-components';

export const DropZoneContainer = styled.div`
  .file-uploader {
    display: block;
  }
`;

export const UploaderPlaceholder = styled.div`
  border: 1px dashed rgba(255, 255, 255, 0.2);
  color: ${({ theme }: { theme: DefaultTheme }) => theme.bg6};
  padding: ${px2rem(24)};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  border-radius: 12px;

  .uploader-thumbnail {
    margin-bottom: ${px2rem(16)};
  }

  .uploader-title {
    font-style: normal;
    font-weight: 500;
    font-size: ${px2rem(18)};
    line-height: ${px2rem(28)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  }

  .uploader-title-yellow {
    background: linear-gradient(to right, rgba(255, 128, 8, 1), rgba(255, 200, 55, 1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
