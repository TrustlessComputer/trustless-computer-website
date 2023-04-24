import IcDiscord from '@/assets/icons/ic_discord.svg';
import IcTwitter from '@/assets/icons/ic_twitter.svg';
import IcLogo from '@/assets/icons/logo.svg';
import { MENU_HEADER } from '@/constants/header';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import { WalletContext } from '@/contexts/wallet-context';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { useWeb3React } from '@web3-react/core';
import { gsap } from 'gsap';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Anchor, StyledLink, Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';

const Header = ({ height }: { height: number }) => {
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect } = useContext(WalletContext);
  const { btcBalance, juiceBalance } = useContext(AssetsContext);
  const refMenu = useRef<HTMLDivElement | null>(null);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const location = useLocation();
  const activePath = location.pathname.split('/')[1];

  const goToConnectWalletPage = async () => {
    navigate(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
  };

  useEffect(() => {
    if (refMenu.current) {
      if (isOpenMenu) {
        gsap.to(refMenu.current, { x: 0, duration: 0.6, ease: 'power3.inOut' });
      } else {
        gsap.to(refMenu.current, {
          x: '100%',
          duration: 0.6,
          ease: 'power3.inOut',
        });
      }
    }
  }, [isOpenMenu]);

  return (
    <Wrapper style={{ height }}>
      <div className="indicator" />
      <Link className="logo" to={ROUTE_PATH.HOME}>
        <img alt="logo" src={IcLogo} />
      </Link>
      <div className="rowLink">
        {MENU_HEADER.map(item => {
          if (item.externalLink) {
            return (
              <Anchor active={false} href={item.route} target="_blank" rel="noopener noreferrer">
                {item.name}
              </Anchor>
            );
          }

          return (
            <StyledLink
              active={activePath === item.activePath}
              to={{ pathname: item.route }}
              key={item.id}
              activeColor="#F9D03F"
            >
              {item.name}
            </StyledLink>
          );
        })}
      </div>
      <MenuMobile ref={refMenu} onCloseMenu={() => setIsOpenMenu(false)} />
      <div className="rightContainer">
        <div className="buttonContainer">
          <a href="https://generative.xyz/discord" target="_blank">
            <img alt="icon" className="icon" src={IcDiscord} />
          </a>
          <a href="https://twitter.com/generative_xyz" target="_blank">
            <img alt="icon" className="icon" src={IcTwitter} />
          </a>
        </div>
      </div>
      {/* <div className="rightContainer">
        {account && isAuthenticated ? (
          <>
            <div className="wallet" onClick={() => navigate(ROUTE_PATH.WALLET)}>
              <WalletBalance>
                <div className="balance">
                  <p>{formatBTCPrice(btcBalance)} BTC</p>
                  <span className="divider"></span>
                  <p>{formatEthPrice(juiceBalance)} TC</p>
                </div>
                <div className="avatar">
                  <Jazzicon diameter={32} seed={jsNumberForAddress(account)} />
                </div>
              </WalletBalance>
            </div>
            <div className="dropdown">
              <ul className="dropdownMenu">
                <li className="dropdownMenuItem" onClick={() => navigate(ROUTE_PATH.WALLET)}>
                  {shortenAddress(account, 4, 4)}
                </li>
                <li className="dropdownMenuItem" onClick={onDisconnect}>
                  Disconnect wallet
                </li>
              </ul>
            </div>
          </>
        ) : (
          <ConnectWalletButton onClick={goToConnectWalletPage}>Connect wallet</ConnectWalletButton>
        )}
        <button className="btnMenuMobile" onClick={() => setIsOpenMenu(true)}>
          <img src={IcOpenMenu} />
        </button>
      </div> */}
    </Wrapper>
  );
};

export default Header;
