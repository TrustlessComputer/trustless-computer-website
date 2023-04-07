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
import { useSearchParams } from 'react-router-dom';

enum DappsTabs {
  NFT = 'nfts',
  TOKEN = 'tokens',
  ARTIFACT = 'artifacts',
}

const Dapps = () => {
  const { tab } = queryString.parse(location.search) as { tab: string };

  const [_, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(tab || DappsTabs.NFT);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  return (
    <DappsContainer>
      <TabContainer className="wrapper">
        <Tabs
          mountOnEnter
          defaultActiveKey={activeTab}
          id="uncontrolled-tab"
          onSelect={key => setActiveTab(key || DappsTabs.NFT)}
        >
          <Tab
            eventKey={DappsTabs.NFT}
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
            eventKey={DappsTabs.TOKEN}
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
            eventKey={DappsTabs.ARTIFACT}
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
                <IconSVG src={IcNames} color="white" type="stroke" />
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
