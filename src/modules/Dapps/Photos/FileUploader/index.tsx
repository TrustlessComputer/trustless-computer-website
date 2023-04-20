import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { FileUploaderContainer } from './FileUploader.styled';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import toast from 'react-hot-toast';

const DropZone: React.FC = () => {
  const onChangeFile = () => {};

  const onSizeError = () => {
    toast.error(`File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}kb.`);
  };

  return (
    <FileUploaderContainer>
      <FileUploader
        handleChange={onChangeFile}
        name={'fileUploader'}
        maxSize={BLOCK_CHAIN_FILE_LIMIT}
        onSizeError={onSizeError}
        classes={'file-uploader'}
      />
    </FileUploaderContainer>
  );
};

export default DropZone;
