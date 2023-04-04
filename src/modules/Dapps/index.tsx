import IcUploadFile from '@/assets/icons/ic-upload-file.svg';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { DappsContainer, TabContainer, UploadFileContainer } from './Dapps.styled';
import ModalUpload from './ModalUpload';

type Props = {};

const Dapps = (props: Props) => {
  const [showUploadModal, setShowUploadModal] = useState(false);

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
            {/* <Add Component Here /> */}
          </Tab>
          {/* <Tab eventKey="names" title="Names"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
          {/* <Tab eventKey="store" title="Bitcoin Dapp store"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
        </Tabs>
      </TabContainer>
      <UploadFileContainer>
        <div className="upload_left">
          <img src={IcUploadFile} alt="upload file icon" />
          <div className="upload_content">
            <h3 className="upload_title">Bitcoin File System</h3>
            <Text size="regular">Cheap. Immutable. Fully on-chain. Large files are supported too.</Text>
          </div>
        </div>
        <div className="upload_right">
          <Button bg={'white'} onClick={() => setShowUploadModal(true)}>
            <Text size="medium" color="bg1" className="button-text" fontWeight="medium">
              Upload file
            </Text>
          </Button>
        </div>
      </UploadFileContainer>
      <ModalUpload show={showUploadModal} handleClose={() => setShowUploadModal(false)} />
    </DappsContainer>
  );
};

export default Dapps;
