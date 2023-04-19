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
import { DappsTabs } from '@/enums/tabs';
import { CDN_URL } from '@/configs';

// enum DappsTabs {
//   NFT = 'nfts',
//   TOKEN = 'tokens',
//   ARTIFACT = 'artifacts',
// }

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

  const renderTabItem = (icon: string, text: string) => {
    return (
      <div className="tab-item">
        <div className="tab-icon">
          <IconSVG maxWidth="32" maxHeight="32" src={''} url={`${icon}`} color="white" type="stroke"></IconSVG>
        </div>
        <Text className="tab-text" size="regular">
          {text}
        </Text>
      </div>
    );
  };

  return (
    <DappsContainer>
      <TabContainer className="wrapper">
        <Tabs
          mountOnEnter
          defaultActiveKey={activeTab}
          id="uncontrolled-tab"
          onSelect={key => setActiveTab(key || DappsTabs.NFT)}
        >
          <Tab eventKey={DappsTabs.NFT} title={renderTabItem(`${CDN_URL}/icons/ic-tab-nfts.svg`, 'NFTs')}>
            <Collections />
          </Tab>
          <Tab eventKey={DappsTabs.TOKEN} title={renderTabItem(`${CDN_URL}/icons/ic-tab-token.svg`, 'Tokens')}>
            <Tokens />
          </Tab>
          <Tab eventKey={DappsTabs.ARTIFACT} title={renderTabItem(`${CDN_URL}/icons/ic-tab-artifact.svg`, 'Artifacts')}>
            <Artifacts />
          </Tab>
          <Tab eventKey="names" title={renderTabItem(`${CDN_URL}/icons/ic-tab-names.svg`, 'Names')}>
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
