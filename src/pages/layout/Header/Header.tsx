import IcLink from '@/assets/icons/ic-link.svg';
import IcLogo from '@/assets/icons/logo.svg';
import IcOpenMenu from '@/assets/icons/ic_hambuger.svg';
import { MENU_HEADER } from '@/constants/header';
import { ROUTE_PATH } from '@/constants/route-path';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledLink, Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';
import Text from '@/components/Text';

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
      <div className="logo">
        <a href="/">Trustless Computer</a>
      </div>
      {/* <Link className="logo" to={ROUTE_PATH.HOME}>
        <img alt="logo" src={IcLogo} />
      </Link> */}
      <div className="rowLink">
        {MENU_HEADER.map(item => {
          const isActive = '/' + activePath === item.activePath || activePath === item.activePath;
          return (
            <StyledLink
              active={isActive}
              to={{ pathname: item.route }}
              key={item.id}
              activeColor={'#F9D03F'}
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
          <a href="https://tcgasstation.com" target="_blank">
            <Text size="medium" fontWeight="semibold">
              Get TC
            </Text>
            <img alt="icon" className="icon" src={IcLink} />
          </a>
          <a href="https://newbitcoincity.com" target="_blank">
            <Text size="medium" fontWeight="semibold">
              NBC
            </Text>
            <img alt="icon" className="icon" src={IcLink} />
          </a>
          <a href="https://discord.gg/yNbatuGMDG" target="_blank">
            <Text size="medium" fontWeight="semibold">
              Discord
            </Text>
            <img alt="icon" className="icon" src={IcLink} />
          </a>
        </div>
      </div>
      <button className="btnMenuMobile" onClick={() => setIsOpenMenu(true)}>
        <img src={IcOpenMenu} alt="menu" />
      </button>
    </Wrapper>
  );
};

export default Header;
