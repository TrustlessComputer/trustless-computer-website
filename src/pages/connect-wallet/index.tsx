import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, ConnectWalletButton } from './ConnectWallet.styled';
import { WalletContext } from '@/contexts/wallet-context';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
import { CDN_URL } from '@/configs';
import { Anchor } from '../layout/Header/Header.styled';
import { MENU_HEADER } from '@/constants/header';
import { Container } from '../layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/route-path';

const ConnectWallet: React.FC = (): React.ReactElement => {
  const { onConnect, generateBitcoinKey, onDisconnect } = useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const user = useSelector(getUserSelector);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      const address = await onConnect();
      await generateBitcoinKey(address || '');
    } catch (err) {
      console.log(err);
      onDisconnect();
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const next = searchParams.get('next');
      if (next) {
        window.location.href = next;
      } else {
        navigate(ROUTE_PATH.HOME);
      }
    }
  }, [isAuthenticated, searchParams, user]);

  return (
    <Container>
      <Wrapper>
        <div className="header">
          <div className="socialContainer">
            <a href="https://generative.xyz/discord" target="_blank">
              <img alt="icon" className="icon" src={`${CDN_URL}/icons/ic-discord-18x18.svg`} />
            </a>
            <a href="https://twitter.com/DappsOnBitcoin" target="_blank">
              <img alt="icon" className="icon" src={`${CDN_URL}/icons/ic-twitter-18x18.svg`} />
            </a>
          </div>
        </div>
        <div className="mainContent">
          <img
            width={292}
            height={118}
            className="logo"
            src={`${CDN_URL}/images/trustless-logo-1.svg`}
            alt="trustless computer logo"
          />
          <h1 className="title">
            Trustless Computer is an open-source protocol that powers decentralized applications on Bitcoin.
          </h1>
          <ConnectWalletButton disabled={isConnecting} onClick={handleConnectWallet}>
            {isConnecting ? 'Connecting...' : 'Connect wallet'}
          </ConnectWalletButton>
        </div>
      </Wrapper>
    </Container>
  );
};

export default ConnectWallet;
