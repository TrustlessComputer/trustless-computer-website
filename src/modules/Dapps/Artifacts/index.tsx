import Button from '@/components/Button';
import Text from '@/components/Text';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import BFSList from './BFSList';
import { UploadFileContainer } from '../Dapps.styled';
import ModalUpload from './ModalUpload';
import IcUploadFile from '@/assets/icons/ic-upload-file.svg';

type Props = {};

const Artifacts = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // const { data, error } = useSWR(getApiKey(getCollections), getCollections);

  const onChangeFile = (file: File): void => {
    setFile(file);
    // setError('');
    // onChange(file);
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
          <Button
            bg={'white'}
            onClick={() => window.open('https://docs.trustless.computer/bitcoin-dapp-examples/artifacts')}
          >
            <Text size="medium" color="bg1" className="button-text" fontWeight="medium">
              Preserve artifact
            </Text>
          </Button>
          {/* <FileUploader
            handleChange={onChangeFile}
            name={'fileUploader'}
            // maxSize={MINT_TOOL_MAX_FILE_SIZE}
            // onSizeError={onSizeError}
            // onTypeError={onTypeError}
            // fileOrFiles={fileOrFiles}
            classes={'file-uploader'}
            // classes={s.dropZone}
            // types={fileTypes}
          /> */}
        </div>
      </UploadFileContainer>
      <BFSList />
      <ModalUpload show={showUploadModal} handleClose={() => setShowUploadModal(false)} file={file} setFile={setFile} />
    </>
  );
};

export default Artifacts;
