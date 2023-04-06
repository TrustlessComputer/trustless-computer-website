import IcFolderOpen from '@/assets/icons/ic-folder-open.svg';
import IcNames from '@/assets/icons/ic-names.svg';
import IcHexagon from '@/assets/icons/ic-hexagon.svg';
import IcCoinTokens from '@/assets/icons/ic-coin-unbroken.svg';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Artifacts from './Artifacts';
import Collections from './Collections';
import Names from './Names';
import { DappsContainer, TabContainer } from './Dapps.styled';
import Tokens from './Tokens';

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
          <Tab
            eventKey="tokens"
            title={
              <div className="tab-item">
                <IconSVG src={IcCoinTokens} color="white" type="stroke"></IconSVG>
                <Text size="regular">Tokens</Text>
              </div>
            }
          >
            {/* <Add Component Here /> */}
            <Tokens />
          </Tab>
          <Tab
            eventKey="files"
            // className={tab === 'files' ? 'active' : ''}
            title={
              <div className="tab-item">
                <IconSVG src={IcFolderOpen} color="white" type="stroke"></IconSVG>
                <Text size="regular">Artifacts</Text>
              </div>
            }
          >
            <Artifacts />
          </Tab>
          <Tab
            eventKey="names"
            title={
              <div className="tab-item">
                <img src={IcNames} alt="names" />
                <Text size="regular">Names</Text>
              </div>
            }
          >
            <Names />
          </Tab>
          {/* <Tab eventKey="store" title="Bitcoin Dapp store"> */}
          {/* <Add Component Here /> */}
          {/* </Tab> */}
        </Tabs>
      </TabContainer>
    </DappsContainer>
  );
};

export default Dapps;
