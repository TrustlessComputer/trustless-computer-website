import Button from '@/components/Button';
import Text from '@/components/Text';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import BFSList from './BFSList';
import { UploadFileContainer } from '../Dapps.styled';
import ModalUpload from './ModalUpload';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import toast from 'react-hot-toast';

type Props = {};

const Artifacts: React.FC<Props> = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  const onSizeError = (): void => {
    toast.error(`File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}kb.`);
  };

  useEffect(() => {
    if (file) {
      setShowUploadModal(true);
    }
  }, [file]);

  return (
    <>
      <UploadFileContainer>
        <div className="upload_left">
          {/* <img src={IcUploadFile} alt="upload file icon" /> */}
          <div className="upload_content">
            <h3 className="upload_title">Artifacts</h3>
            <Text size="medium">Cheap. Immutable. Fully on-chain. Large files are supported too.</Text>
          </div>
        </div>
        <div className="upload_right">
          <Button bg={'white'} onClick={() => setShowUploadModal(true)}>
            <Text size="medium" color="bg1" className="button-text" fontWeight="medium">
              Preserve artifact
            </Text>
          </Button>
          <FileUploader
            handleChange={onChangeFile}
            name={'fileUploader'}
            maxSize={BLOCK_CHAIN_FILE_LIMIT}
            onSizeError={onSizeError}
            classes={'file-uploader'}
          />
        </div>
      </UploadFileContainer>
      <BFSList />
      <ModalUpload show={showUploadModal} handleClose={() => setShowUploadModal(false)} file={file} setFile={setFile} />
    </>
  );
};

export default Artifacts;
