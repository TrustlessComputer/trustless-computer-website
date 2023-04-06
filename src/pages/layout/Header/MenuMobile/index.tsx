import { MENU_HEADER } from '@/constants/header';
import React, { ForwardedRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '../Header.styled';
import { Wrapper } from './MenuMobile.styled';
import IcMenuClose from '@/assets/icons/ic_close_menu.svg';

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
            <Link active={activePath === item.activePath} href={item.route} key={item.id}>
              {item.name}
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
});

MenuMobile.displayName = 'MenuMobile';
export default MenuMobile;
