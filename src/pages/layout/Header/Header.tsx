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
import { useLocation } from 'react-router-dom';
import { ConnectWalletButton, Link, WalletAdress, WalletBalance, Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';

// const WalletAddress = styled.span`
//   font-size: ${px2rem(14)};
//   line-height: ${px2rem(24)};
//   color: #fff;
// `;

const Header = ({ height }: { height: number }) => {
  const { account } = useWeb3React();
  console.log('🚀 ~ Header ~ account:', account);
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

  const handleShowAddress = (address: string) => {
    return (
      <WalletAdress className="balance">
        <Text size="regular">{shortenAddress(address, 4, 4)}</Text>
      </WalletAdress>
    );
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
          return (
            <Link active={activePath === item.activePath} href={item.route} target={item.target} key={item.id}>
              {item.name}
            </Link>
          );
        })}
      </div>
      <MenuMobile ref={refMenu} onCloseMenu={() => setIsOpenMenu(false)} />
      <div className="rightContainer">
        {isAuthenticated ? (
          <div className="wallet">
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
            {/* <WalletAddress className="cursor-pointer">{shortenAddress(account, 4, 4)}</WalletAddress> */}
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
