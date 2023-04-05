import IcUploadFile from '@/assets/icons/ic-upload-file.svg';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { getCollections } from '@/services/bfs';
import { getApiKey } from '@/utils/swr';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import useSWR from 'swr';
import BFSList from './BFSList';
import { DappsContainer, TabContainer, UploadFileContainer } from './Dapps.styled';
import ModalUpload from './ModalUpload';

const Dapps = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
    <DappsContainer>
      <TabContainer className="wrapper">
        <Tabs defaultActiveKey="files" id="uncontrolled-tab">
          {/* <Tab eventKey="nfts" title="NFTS"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
          {/* <Tab eventKey="tokens" title="Tokens"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
          <Tab
            eventKey="files"
            title={
              <div className="tab-item">
                <img src="/assets/icons/ic-folder-open.svg" alt="files open icon" />
                <Text size="regular">Files</Text>
              </div>
            }
          >
            <UploadFileContainer>
              <div className="upload_left">
                <img src={IcUploadFile} alt="upload file icon" />
                <div className="upload_content">
                  <h3 className="upload_title">Bitcoin File System</h3>
                  <Text size="regular">Cheap. Immutable. Fully on-chain. Large files are supported too.</Text>
                </div>
              </div>
              <div className="upload_right">
                <Button bg={'white'}>
                  <Text size="medium" color="bg1" className="button-text" fontWeight="medium">
                    Upload file
                  </Text>
                </Button>
                <FileUploader
                  handleChange={onChangeFile}
                  name={'fileUploader'}
                  // maxSize={MINT_TOOL_MAX_FILE_SIZE}
                  // onSizeError={onSizeError}
                  // onTypeError={onTypeError}
                  // fileOrFiles={fileOrFiles}
                  classes={'file-uploader'}
                  // classes={s.dropZone}
                  // types={fileTypes}
                />
              </div>
            </UploadFileContainer>
            <BFSList />
          </Tab>
          {/* <Tab eventKey="names" title="Names"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
          {/* <Tab eventKey="store" title="Bitcoin Dapp store"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
        </Tabs>
      </TabContainer>
      <ModalUpload show={showUploadModal} handleClose={() => setShowUploadModal(false)} file={file} setFile={setFile} />
    </DappsContainer>
  );
};

export default Dapps;
