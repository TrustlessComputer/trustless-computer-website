import IcCoinTokens from '@/assets/icons/ic-coin-unbroken.svg';
import IcFolderOpen from '@/assets/icons/ic-folder-open.svg';
import IcHexagon from '@/assets/icons/ic-hexagon.svg';
import IcNames from '@/assets/icons/ic-names.svg';
import IcSwitch from '@/assets/icons/ic-arrow-switch.svg';
import IconSVG from '@/components/IconSVG';

import Text from '@/components/Text';
import { DappsTabs } from '@/enums/tabs';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { getAccessToken } from '@/utils/auth-storage';
import queryString from 'query-string';
import ArtifactsProfile from './ArtifactsProfile';
import NamesProfile from './NamesProfile';
import NftsProfile from './NftsProfile';
import { StyledProfile, TabContainer } from './Profile.styled';
import TokensProfile from './TokensProfile';
import UserInfo from './UserInfo';
import TransactionsProfile from './TransactionsProfile';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import useBitcoin from '@/hooks/useBitcoin';
import useCompleteUninscribedTransaction from '@/hooks/contract-operations/useCompleteUninscribedTransaction';

const Wallet = () => {
  const accessToken = getAccessToken();

  const navigate = useNavigate();

  const { tab } = queryString.parse(location.search) as { tab: string };

  const [_, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(tab || DappsTabs.NFT);

  const user = useSelector(getUserSelector);
  const { getUnInscribedTransactionByAddress } = useBitcoin();
  const { run } = useCompleteUninscribedTransaction({});

  const [transactions, setTransactions] = useState<string[]>([]);

  const fetchTransactions = async () => {
    if (user && user.walletAddress) {
      try {
        const unInscribedTxIDs = await getUnInscribedTransactionByAddress(user.walletAddress);
        setTransactions(unInscribedTxIDs);
      } catch (err: unknown) {
        console.log('Fail to get transactions');
      }
    }
  };

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user]);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  if (!accessToken) {
    navigate(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
    return <></>;
  }

  const navigateToDapps = () => {
    navigate(`${ROUTE_PATH.DAPPS}?tab=${activeTab}`);
  };

  const handleResumeTransactions = () => {
    run();
    console.log('resume all transactions');
  };

  return (
    <StyledProfile className="row">
      <UserInfo className="col-xl-2" />
      <TabContainer className="wrapper col-xl-9 offset-xl-1">
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
                <IconSVG maxWidth="28" maxHeight="28" src={IcHexagon} color="white" type="stroke"></IconSVG>
                <Text className="tab-text" size="regular">
                  NFTs
                </Text>
              </div>
            }
          >
            {/* <CollectionProfile /> */}
            <NftsProfile />
          </Tab>
          <Tab
            eventKey={DappsTabs.TOKEN}
            title={
              <div className="tab-item">
                <IconSVG maxWidth="28" maxHeight="28" src={IcCoinTokens} color="white" type="stroke"></IconSVG>
                <Text className="tab-text" size="regular">
                  Tokens
                </Text>
              </div>
            }
          >
            <TokensProfile />
          </Tab>
          <Tab
            eventKey={DappsTabs.ARTIFACT}
            // className={tab === 'files' ? 'active' : ''}
            title={
              <div className="tab-item">
                <IconSVG maxWidth="28" maxHeight="28" src={IcFolderOpen} color="white" type="stroke"></IconSVG>
                <Text className="tab-text" size="regular">
                  Artifacts
                </Text>
              </div>
            }
          >
            <ArtifactsProfile />
          </Tab>
          <Tab
            eventKey={DappsTabs.NAMES}
            title={
              <div className="tab-item">
                <IconSVG maxWidth="28" maxHeight="28" src={IcNames} color="white" type="stroke" />
                <Text className="tab-text" size="regular">
                  Names
                </Text>
              </div>
            }
          >
            <NamesProfile />
          </Tab>
          <Tab
            eventKey={DappsTabs.TRANSACTION}
            title={
              <div className="tab-item">
                <IconSVG maxWidth="28" maxHeight="28" src={IcSwitch} color="white" type="stroke" />
                <Text className="tab-text" size="regular">
                  Transactions
                </Text>
              </div>
            }
          >
            <TransactionsProfile transactionList={transactions} />
          </Tab>
          <Tab
            title={
              activeTab === DappsTabs.TRANSACTION ? (
                <div
                  className={`explore-btn ${transactions.length === 0 ? 'disable' : ''}`}
                  onClick={handleResumeTransactions}
                >
                  <Text className="font-ibm" size="regular">
                    Resume all transactions
                  </Text>
                  {/* <img src={`${CDN_URL}/icons/ic-arrow-right.svg`} alt="" /> */}
                </div>
              ) : (
                <div className="explore-btn" onClick={navigateToDapps}>
                  <Text className="font-ibm" size="regular">
                    Explore more
                  </Text>
                  <img src={`${CDN_URL}/icons/ic-arrow-right.svg`} alt="" />
                </div>
              )
            }
          >
            <NamesProfile />
          </Tab>
        </Tabs>
      </TabContainer>
    </StyledProfile>
  );
};

export default Wallet;
