import IcDiscord from '@/assets/icons/ic_discord.svg';
import IcTwitter from '@/assets/icons/ic_twitter.svg';
import IcLogo from '@/assets/icons/logo.svg';
import { MENU_HEADER } from '@/constants/header';
import { ROUTE_PATH } from '@/constants/route-path';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledLink, Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';

const Header = ({ height }: { height: number }) => {
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
      <Link className="logo" to={ROUTE_PATH.HOME}>
        <img alt="logo" src={IcLogo} />
      </Link>
      <div className="rowLink">
        {MENU_HEADER.map(item => {
          const isActive = '/' + activePath === item.activePath || activePath === item.activePath;
          return (
            <StyledLink
              active={isActive}
              to={{ pathname: item.route }}
              key={item.id}
              activeColor="#F9D03F"
              style={{ lineHeight: `${height}px` }}
            >
              {item.name}
            </StyledLink>
          );
        })}
      </div>
      <MenuMobile ref={refMenu} onCloseMenu={() => setIsOpenMenu(false)} />
      <div className="rightContainer">
        <div className="buttonContainer">
          <a href="https://discord.gg/yNbatuGMDG" target="_blank">
            <img alt="icon" className="icon" src={IcDiscord} />
          </a>
          <a href="https://twitter.com/NewBitcoinCity" target="_blank">
            <img alt="icon" className="icon" src={IcTwitter} />
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
