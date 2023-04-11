import IcAvatarDefault from '@/assets/icons/ic-avatar.svg';
import IcMenuClose from '@/assets/icons/ic_close_menu.svg';
import { MENU_HEADER } from '@/constants/header';
import { AssetsContext } from '@/contexts/assets-context';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import React, { ForwardedRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Anchor, ConnectWalletButton, StyledLink, WalletBalance } from '../Header.styled';
import { Wrapper } from './MenuMobile.styled';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { ROUTE_PATH } from '@/constants/route-path';

interface IProp {
  onCloseMenu: () => void;
}

const MenuMobile = React.forwardRef(({ onCloseMenu }: IProp, ref: ForwardedRef<HTMLDivElement>) => {
  const location = useLocation();
  const activePath = location.pathname.split('/')[1];
  const { btcBalance, juiceBalance } = useContext(AssetsContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    navigate(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
  };

  return (
    <Wrapper ref={ref}>
      <div className="inner">
        <button className="btnMenuMobile" onClick={onCloseMenu}>
          <img src={IcMenuClose} />
        </button>
        {MENU_HEADER.map(item => {
          if (item.absolute) {
            return (
              <Anchor active={activePath === item.activePath} href={item.route} target={item.target} key={item.id}>
                {item.name}
              </Anchor>
            );
          }
          return (
            <StyledLink active={activePath === item.activePath} to={item.route} target={item.target} key={item.id}>
              {item.name}
            </StyledLink>
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
