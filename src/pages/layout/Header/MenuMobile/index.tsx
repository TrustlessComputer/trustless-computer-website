import IcAvatarDefault from '@/assets/icons/ic-avatar.svg';
import IcMenuClose from '@/assets/icons/ic_close_menu.svg';
import { MENU_HEADER } from '@/constants/header';
import { AssetsContext } from '@/contexts/assets-context';
import { WalletContext } from '@/contexts/wallet-context';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import { useWeb3React } from '@web3-react/core';
import React, { ForwardedRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ConnectWalletButton, Link, WalletBalance } from '../Header.styled';
import { Wrapper } from './MenuMobile.styled';

import IcDiscord from '@/assets/icons/ic_discord.svg';
import IcTwitter from '@/assets/icons/ic_twitter.svg';

interface IProp {
  onCloseMenu: () => void;
}

const MenuMobile = React.forwardRef(({ onCloseMenu }: IProp, ref: ForwardedRef<HTMLDivElement>) => {
  const location = useLocation();
  const activePath = location.pathname.split('/')[1];

  const { account } = useWeb3React();
  const { onConnect, generateBitcoinKey } = useContext(WalletContext);
  const { btcBalance, juiceBalance } = useContext(AssetsContext);
  const isAuthenticated = !!account;

  const handleConnectWallet = async () => {
    await onConnect();
    await generateBitcoinKey();
  };

  return (
    <Wrapper ref={ref}>
      <div className="inner">
        <button className="btnMenuMobile" onClick={onCloseMenu}>
          <img src={IcMenuClose} />
        </button>
        {MENU_HEADER.map(item => {
          return (
            <Link active={activePath === item.activePath} href={item.route} target={item.target} key={item.id}>
              {item.name}
            </Link>
          );
        })}
        {isAuthenticated ? (
          <div className="wallet mobile">
            <WalletBalance>
              <div className="balance">
                <p>{formatBTCPrice(btcBalance)} BTC</p>
                <span className="divider"></span>
                <p>{formatEthPrice(juiceBalance)} TC</p>
              </div>
              <div className="avatar">
                <img src={IcAvatarDefault} alt="default avatar" />
              </div>
            </WalletBalance>
            {/* <WalletAddress className="cursor-pointer">{shortenAddress(account, 4, 4)}</WalletAddress> */}
          </div>
        ) : (
          <ConnectWalletButton onClick={handleConnectWallet}>Connect Wallet</ConnectWalletButton>
        )}
      </div>
    </Wrapper>
  );
});

MenuMobile.displayName = 'MenuMobile';
export default MenuMobile;
