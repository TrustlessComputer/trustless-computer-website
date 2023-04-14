import IcSwitch from '@/assets/icons/ic-arrow-switch.svg';
import IcCoinTokens from '@/assets/icons/ic-coin-unbroken.svg';
import IcFolderOpen from '@/assets/icons/ic-folder-open.svg';
import IcHexagon from '@/assets/icons/ic-hexagon.svg';
import IcNames from '@/assets/icons/ic-names.svg';
import IconSVG from '@/components/IconSVG';

import Text from '@/components/Text';
import { DappsTabs } from '@/enums/tabs';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import useBatchCompleteUninscribedTransaction from '@/hooks/contract-operations/useBatchCompleteUninscribedTransaction';
import useBitcoin from '@/hooks/useBitcoin';
import { getUserSelector } from '@/state/user/selector';
import { getAccessToken } from '@/utils/auth-storage';
import queryString from 'query-string';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ArtifactsProfile from './ArtifactsProfile';
import NamesProfile from './NamesProfile';
import NftsProfile from './NftsProfile';
import { StyledProfile, TabContainer } from './Profile.styled';
import TokensProfile from './TokensProfile';
import TransactionsProfile from './TransactionsProfile';
import UserInfo from './UserInfo';

const Wallet = () => {
  const accessToken = getAccessToken();

  const navigate = useNavigate();

  const { tab } = queryString.parse(location.search) as { tab: string };

  const [_, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(tab || DappsTabs.NFT);

  const user = useSelector(getUserSelector);
  const { getUnInscribedTransactionDetailByAddress } = useBitcoin();
  const { run, transactionConfirmed } = useBatchCompleteUninscribedTransaction({});

  const [transactions, setTransactions] = useState<string[]>([]);

  const fetchTransactions = async () => {
    if (user && user.walletAddress) {
      try {
        const res = await getUnInscribedTransactionDetailByAddress(user.walletAddress);
        if (res && res.length > 0) {
          setTransactions(res.map(tx => tx.Hash));
        }
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

  const handleResumeTransactions = async () => {
    try {
      await run();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <StyledProfile className="row">
      <UserInfo className="col-xl-2" />
      <TabContainer className="wrapper col-xl-9 offset-xl-1">
        <Tabs defaultActiveKey={activeTab} id="uncontrolled-tab" onSelect={key => setActiveTab(key || DappsTabs.NFT)}>
          <Tab
            mountOnEnter
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
            mountOnEnter
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
            mountOnEnter
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
            mountOnEnter
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
            mountOnEnter
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
            <TransactionsProfile pendingList={transactions} />
          </Tab>

          <Tab
            mountOnEnter
            title={
              activeTab === DappsTabs.TRANSACTION ? (
                <div
                  className={`explore-btn ${transactions.length === 0 || transactionConfirmed ? 'disable' : ''}`}
                  onClick={handleResumeTransactions}
                >
                  <Text className="font-ibm" size="regular">
                    {`Resume all pending`}
                  </Text>
                  {/* <img src={`${CDN_URL}/icons/ic-arrow-right.svg`} alt="" /> */}
                </div>
              ) : (
                <div className="explore-btn" onClick={navigateToDapps}>
                  <Text className="font-ibm" size="regular">
                    Explore Dapp Store
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
