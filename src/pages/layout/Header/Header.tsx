import { Wrapper, Link, WalletBalance } from './Header.styled';
import IcLogo from '@/assets/icons/logo.svg';
import Button from '@/components/Button';
import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { WalletContext } from '@/contexts/wallet-context';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '@/utils';
import { useLocation } from 'react-router-dom';
import { MENU_HEADER } from '@/constants/header';
import MenuMobile from './MenuMobile';
import { gsap } from 'gsap';
import IcOpenMenu from '@/assets/icons/ic_hambuger.svg';
import { OverlayTrigger } from 'react-bootstrap';
import { AssetsContext } from '@/contexts/assets-context';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';

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
  const { onConnect, generateBitcoinKey } = useContext(WalletContext);
  const { btcBalance, juiceBalance } = useContext(AssetsContext);
  const isAuthenticated = !!account;

  const refMenu = useRef<HTMLDivElement | null>(null);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const location = useLocation();
  const activePath = location.pathname.split('/')[1];

  const handleConnect = async () => {
    const address = await onConnect();
    const taproot = await generateBitcoinKey();
    console.log(address, taproot);
  };

  const handleShowBalance = useMemo(() => {
    return (
      <WalletBalance className="balance">
        <p>Balance: </p>
        <p>{formatBTCPrice('10000000000')} BTC</p>
        <p>{formatEthPrice('10000000000')} TC</p>
      </WalletBalance>
    );
  }, [btcBalance, juiceBalance]);

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
          <div className="wallet">
            <OverlayTrigger trigger="hover" placement="bottom" overlay={handleShowBalance}>
              <WalletAddress className="cursor-pointer">{shortenAddress(account, 4, 4)}</WalletAddress>
            </OverlayTrigger>
          </div>
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
