import IcFolderOpen from '@/assets/icons/ic-folder-open.svg';
import IcHexagon from '@/assets/icons/ic-hexagon.svg';
import Text from '@/components/Text';
import { Tab, Tabs } from 'react-bootstrap';
// import Artifacts from './Artifacts';
import { DappsContainer, TabContainer } from './Dapps.styled';
import Collections from './Collections';

const Dapps = () => {
  return (
    <DappsContainer>
      <TabContainer className="wrapper">
        <Tabs defaultActiveKey="files" id="uncontrolled-tab">
          <Tab
            eventKey="nfts"
            title={
              <div className="tab-item">
                <img src={IcHexagon} alt="hexagon icon" />
                <Text size="regular">NFTs</Text>
              </div>
            }
          >
            <Collections />
          </Tab>
          {/* <Tab eventKey="tokens" title="Tokens"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
          <Tab
            eventKey="files"
            title={
              <div className="tab-item">
                <img src={IcFolderOpen} alt="files open icon" />
                <Text size="regular">Artiacts</Text>
              </div>
            }
          >
            {/* <Artifacts /> */}
          </Tab>
          {/* <Tab eventKey="names" title="Names"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
          {/* <Tab eventKey="store" title="Bitcoin Dapp store"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
        </Tabs>
      </TabContainer>
    </DappsContainer>
  );
};

export default Dapps;
