import { MENU_HEADER } from '@/constants/header';
import React, { ForwardedRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '../Header.styled';
import { Wrapper } from './MenuMobile.styled';

interface IProp {}

const MenuMobile = React.forwardRef(({}: IProp, ref: ForwardedRef<HTMLDivElement>) => {
  const location = useLocation();
  const activePath = location.pathname.split('/')[1];

  return (
    <Wrapper ref={ref}>
      <div className="inner">
        {MENU_HEADER.map(item => {
          return (
            <Link active={activePath === item.activePath} href={item.route}>
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
