import { MENU_HEADER } from '@/constants/header';
import React, { ForwardedRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '../Header.styled';
import { Wrapper } from './MenuMobile.styled';
import IcMenuClose from '@/assets/icons/ic_close_menu.svg';

import IcDiscord from '@/assets/icons/ic_discord.svg';
import IcTwitter from '@/assets/icons/ic_twitter.svg';

interface IProp {
  onCloseMenu: () => void;
}

const MenuMobile = React.forwardRef(({ onCloseMenu }: IProp, ref: ForwardedRef<HTMLDivElement>) => {
  const location = useLocation();
  const activePath = location.pathname.split('/')[1];

  return (
    <Wrapper ref={ref}>
      <div className="inner">
        <button className="btnMenuMobile" onClick={onCloseMenu}>
          <img src={IcMenuClose} />
        </button>
        {MENU_HEADER.map(item => {
          return (
            <Link active={activePath === item.activePath} href={item.route} target={item.target}>
              {item.name}
            </Link>
          );
        })}
        <div className="social">
          <a href="https://discord.gg/tscNGxEw2s" target="_blank">
            <img alt="icon" className="icon" src={IcDiscord} />
          </a>
          <a href="https://twitter.com/DappsOnBitcoin" target="_blank">
            <img alt="icon" className="icon" src={IcTwitter} />
          </a>
        </div>
      </div>
    </Wrapper>
  );
});

MenuMobile.displayName = 'MenuMobile';
export default MenuMobile;
