import IcFolderOpen from '@/assets/icons/ic-folder-open.svg';
import IcHexagon from '@/assets/icons/ic-hexagon.svg';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Artifacts from './Artifacts';
import Collections from './Collections';
import { DappsContainer, TabContainer } from './Dapps.styled';

const Dapps = () => {
  const { tab } = queryString.parse(location.search) as { tab: string };

  const [activeTab, setActiveTab] = useState(tab || 'nfts');

  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  return (
    <DappsContainer>
      <TabContainer className="wrapper">
        <Tabs defaultActiveKey={activeTab} id="uncontrolled-tab">
          <Tab
            eventKey="nfts"
            title={
              <div className="tab-item">
                <IconSVG src={IcHexagon} color="white" type="stroke"></IconSVG>
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
            // className={tab === 'files' ? 'active' : ''}
            title={
              <div className="tab-item">
                <img src={IcFolderOpen} alt="files open icon" />
                <Text size="regular">Artiacts</Text>
              </div>
            }
          >
            <Artifacts />
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
