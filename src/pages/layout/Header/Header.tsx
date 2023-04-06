import { Wrapper, Link } from './Header.styled';
import IcLogo from '@/assets/icons/logo.svg';
import Button from '@/components/Button';
import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import { useContext, useEffect, useRef, useState } from 'react';
import { WalletContext } from '@/contexts/wallet-context';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '@/utils';
import { useLocation } from 'react-router-dom';
import { MENU_HEADER } from '@/constants/header';
import MenuMobile from './MenuMobile';
import { gsap } from 'gsap';
import IcOpenMenu from '@/assets/icons/ic_hambuger.svg';

const ConnectWalletButton = styled(Button)`
  background: #4f43e2;
  padding: ${px2rem(4)} ${px2rem(12)};
  color: #fff;
  font-size: ${px2rem(14)};
  line-height: ${px2rem(24)};
  font-weight: 400;
`;

const WalletAddress = styled.span`
  font-size: ${px2rem(14)};
  line-height: ${px2rem(24)};
  color: #fff;
`;

const Header = ({ height }: { height: number }) => {
  const { account } = useWeb3React();
  const { onConnect } = useContext(WalletContext);
  const isAuthenticated = !!account;

  const refMenu = useRef<HTMLDivElement | null>(null);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const location = useLocation();
  const activePath = location.pathname.split('/')[1];

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
      <a className="logo" href="/">
        <img alt="logo" src={IcLogo} />
      </a>
      <div className="rowLink">
        {MENU_HEADER.map(item => {
          return (
            <Link active={activePath === item.activePath} href={item.route}>
              {item.name}
            </Link>
          );
        })}
      </div>
      <MenuMobile ref={refMenu} onCloseMenu={() => setIsOpenMenu(false)} />
      <div className="rightContainer">
        {isAuthenticated ? (
          <WalletAddress>{shortenAddress(account, 4, 4)}</WalletAddress>
        ) : (
          <ConnectWalletButton onClick={onConnect}>Connect Wallet</ConnectWalletButton>
        )}

        <button className="btnMenuMobile" onClick={() => setIsOpenMenu(true)}>
          <img src={IcOpenMenu} />
        </button>
      </div>
    </Wrapper>
  );
};

export default Header;
