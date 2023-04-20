import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { CDN_URL } from '@/configs';
import px2rem from '@/utils/px2rem';
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

const StyledPhotos = styled.div`
  margin-top: ${px2rem(48)};
`;

enum PhotoTabs {
  ALL = 'all',
  ALBUM = 'album',
  IMAGE = 'image',
}

const BitcoinPhotos = () => {
  const [activeTab, setActiveTab] = useState<string>(PhotoTabs.ALL);

  const renderTabItem = (icon: string, text: string, total?: number) => {
    return (
      <div className="tab-item">
        <div className="tab-icon">
          <IconSVG maxWidth="32" maxHeight="32" src={''} url={`${icon}`} color="white" type="stroke"></IconSVG>
        </div>
        <Text className="tab-text" size="medium" fontWeight="medium">
          {text} {total && total > 0 && `(${total})`}
        </Text>
      </div>
    );
  };

  return (
    <StyledPhotos>
      <p>Photo Upload Component</p>
      <Tabs
        mountOnEnter
        defaultActiveKey={activeTab}
        id="uncontrolled-tab"
        onSelect={key => setActiveTab(key || PhotoTabs.ALL)}
      >
        <Tab eventKey={PhotoTabs.ALL} title={renderTabItem(`${CDN_URL}/icons/ic-tab-nfts.svg`, 'NFTs')}>
          {/* <Collections /> */}
        </Tab>
        <Tab eventKey={PhotoTabs.ALBUM} title={renderTabItem(`${CDN_URL}/icons/ic-tab-token.svg`, 'Tokens')}>
          {/* <Tokens /> */}
        </Tab>
        <Tab eventKey={PhotoTabs.IMAGE} title={renderTabItem(`${CDN_URL}/icons/ic-tab-artifact.svg`, 'Artifacts')}>
          {/* <Artifacts /> */}
        </Tab>
      </Tabs>
    </StyledPhotos>
  );
};

export default BitcoinPhotos;
