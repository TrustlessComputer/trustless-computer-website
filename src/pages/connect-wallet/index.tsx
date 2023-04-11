import React, { useContext, useEffect } from 'react';
import { Wrapper, ConnectWalletButton } from './ConnectWallet.styled';
import { WalletContext } from '@/contexts/wallet-context';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { CDN_URL } from '@/configs';
import { Anchor } from '../layout/Header/Header.styled';
import { MENU_HEADER } from '@/constants/header';
import { Container } from '../layout';

const ConnectWallet: React.FC = (): React.ReactElement => {
  const { onConnect } = useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const activePath = location.pathname.split('/')[1];

  useEffect(() => {}, [isAuthenticated]);

  return (
    <Container>
      <Wrapper>
        <div className="header">
          <Anchor
            active={activePath === MENU_HEADER[4].activePath}
            href={MENU_HEADER[4].route}
            target={MENU_HEADER[4].target}
            key={MENU_HEADER[4].id}
          >
            {MENU_HEADER[4].name}
          </Anchor>
          <div className="socialContainer">
            <a href="https://discord.com/channels/1052411011036090458/1094649301210239086" target="_blank">
              <img alt="icon" className="icon" src={`${CDN_URL}/icons/ic-discord-18x18.svg`} />
            </a>
            <a href="https://twitter.com/DappsOnBitcoin" target="_blank">
              <img alt="icon" className="icon" src={`${CDN_URL}/icons/ic-twitter-18x18.svg`} />
            </a>
          </div>
        </div>
        <div className="mainContent">
          <img className="logo" src={`${CDN_URL}/images/trustless-logo.svg`} alt="trustless computer logo" />
          <h1 className="title">
            Trustless Computer is an open-source protocol that powers decentralized applications on Bitcoin.
          </h1>
          <ConnectWalletButton>Connect wallet</ConnectWalletButton>
        </div>
      </Wrapper>
    </Container>
  );
};

export default ConnectWallet;
