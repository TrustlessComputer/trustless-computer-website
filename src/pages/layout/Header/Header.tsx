import IcOpenMenu from '@/assets/icons/ic_hambuger.svg';
import IcLogo from '@/assets/icons/logo.svg';
import Text from '@/components/Text';
import { MENU_HEADER } from '@/constants/header';
import { AssetsContext } from '@/contexts/assets-context';
import { WalletContext } from '@/contexts/wallet-context';
import { shortenAddress } from '@/utils';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import { useWeb3React } from '@web3-react/core';
import { gsap } from 'gsap';
import { useContext, useEffect, useRef, useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useLocation, useNavigate } from 'react-router-dom';
import { Anchor, ConnectWalletButton, StyledLink, WalletAdress, WalletBalance, Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';
import { TC_URL } from '@/configs';

const Header = ({ height }: { height: number }) => {
  const { account } = useWeb3React();
  const { onConnect, generateBitcoinKey, onDisconnect } = useContext(WalletContext);
  const { btcBalance, juiceBalance } = useContext(AssetsContext);
  const isAuthenticated = !!account;
  const navigate = useNavigate();

  const refMenu = useRef<HTMLDivElement | null>(null);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const location = useLocation();
  const activePath = location.pathname.split('/')[1];

  const handleShowAddress = (address: string) => {
    return (
      <WalletAdress className="balance">
        <Text size="regular">{shortenAddress(address, 4, 4)}</Text>
      </WalletAdress>
    );
  };

  const handleConnectWallet = async () => {
    try {
      await onConnect();
      await generateBitcoinKey();
    } catch (err) {
      console.log(err);
      onDisconnect();
    }
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
      <a className="logo" href="/">
        <img alt="logo" src={IcLogo} />
      </a>
      <div className="rowLink">
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
      </div>
      <MenuMobile ref={refMenu} onCloseMenu={() => setIsOpenMenu(false)} />
      <div className="rightContainer">
        {isAuthenticated ? (
          <div className="wallet" onClick={() => window.open(`${TC_URL}/${account}`)}>
            <WalletBalance>
              <div className="balance">
                <p>{formatBTCPrice(btcBalance)} BTC</p>
                <span className="divider"></span>
                <p>{formatEthPrice(juiceBalance)} TC</p>
              </div>
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={handleShowAddress(account)}>
                <div className="avatar">
                  <Jazzicon diameter={32} seed={jsNumberForAddress(account)} />
                </div>
              </OverlayTrigger>
            </WalletBalance>
          </div>
        ) : (
          <ConnectWalletButton onClick={handleConnectWallet}>Connect Wallet</ConnectWalletButton>
        )}
        <button className="btnMenuMobile" onClick={() => setIsOpenMenu(true)}>
          <img src={IcOpenMenu} />
        </button>
      </div>
    </Wrapper>
  );
};

export default Header;
