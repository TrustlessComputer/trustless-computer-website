import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { CDN_URL } from '@/configs';
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { StyledPhotos, TabContainer } from './Photos.styled';

enum PhotoTabs {
  ALL = 'all',
  ALBUM = 'album',
  IMAGE = 'image',
}

const BitcoinPhotos = () => {
  const [activeTab, setActiveTab] = useState<string>(PhotoTabs.ALL);

  const renderTabItem = (icon: string, text: string, total?: number) => {
    return (
      <div className="photo-tab">
        <div className="photo-tab-icon">
          <IconSVG maxWidth="20" maxHeight="20" src={''} url={`${icon}`} color="white" type="fill"></IconSVG>
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
      <TabContainer>
        <Tabs
          mountOnEnter
          defaultActiveKey={activeTab}
          id="uncontrolled-tab"
          onSelect={key => setActiveTab(key || PhotoTabs.ALL)}
        >
          <Tab eventKey={PhotoTabs.ALL} title={renderTabItem(`${CDN_URL}/icons/ic-grid.svg`, 'All')}>
            {/* <Collections /> */}
          </Tab>
          <Tab eventKey={PhotoTabs.ALBUM} title={renderTabItem(`${CDN_URL}/icons/ic-album.svg`, 'Album')}>
            {/* <Tokens /> */}
          </Tab>
          <Tab eventKey={PhotoTabs.IMAGE} title={renderTabItem(`${CDN_URL}/icons/ic-image.svg`, 'Image')}>
            {/* <Artifacts /> */}
          </Tab>
        </Tabs>
      </TabContainer>
    </StyledPhotos>
  );
};

export default BitcoinPhotos;
