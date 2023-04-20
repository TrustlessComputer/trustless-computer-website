import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { DropZoneContainer, UploaderPlaceholder } from './DropZone.styled';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import toast from 'react-hot-toast';
import { CDN_URL } from '@/configs';

const fileTypes = ['jpg', 'png', 'jpeg', 'gif'];

const DropZone: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  const onSizeError = (): void => {
    setFile(null);
    toast.error(`File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}kb.`);
  };

  return (
    <DropZoneContainer>
      <FileUploader
        handleChange={onChangeFile}
        name={'fileUploader'}
        maxSize={BLOCK_CHAIN_FILE_LIMIT}
        onSizeError={onSizeError}
        classes={'file-uploader'}
        types={fileTypes}
      >
        {!file && (
          <UploaderPlaceholder>
            <img className="uploader-thumbnail" src={`${CDN_URL}/images/upload-image.svg`} alt="upload-image.svg" />
            <p className="uploader-title">
              Drag and drop an image, or <span className="uploader-title-yellow">Browse</span>
            </p>
          </UploaderPlaceholder>
        )}
      </FileUploader>
    </DropZoneContainer>
  );
};

export default DropZone;
