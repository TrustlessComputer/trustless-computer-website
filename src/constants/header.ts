import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';

export const MENU_HEADER = [
  {
    id: 'menu-1',
    name: 'Layer 1',
    route: ROUTE_PATH.PROTOCOL,
    activePath: '',
  },
  {
    id: 'menu-2',
    name: 'Layer 2',
    route: ROUTE_PATH.LAYER2,
    activePath: ROUTE_PATH.LAYER2,
  },
  // {
  //   id: 'menu-2',
  //   name: 'Computer',
  //   route: ROUTE_PATH.COMPUTER,
  //   activePath: ROUTE_PATH.COMPUTER,
  // },
  {
    id: 'menu-3',
    name: 'Token',
    route: ROUTE_PATH.TOKENS,
    activePath: ROUTE_PATH.TOKENS,
  },
  // {
  //   id: 'menu-4',
  //   name: 'Dapp Store',
  //   route: ROUTE_PATH.STORE,
  //   activePath: ROUTE_PATH.STORE,
  // },
  // {
  //   id: 'menu-5',
  //   name: 'The Pioneers',
  //   route: ROUTE_PATH.PIONEERS,
  //   activePath: ROUTE_PATH.PIONEERS,
  //   color: '#FF7E21',
  //   iconPath: `${CDN_URL}/icons/ic-flag-pioneer.svg`,
  // },
  // {
  //   id: 'menu-3',
  //   name: 'Developers',
  //   route: ROUTE_PATH.DEVELOPER,
  //   activePath: 'developer',
  // },
];

export const MENU_MOBILE = [...MENU_HEADER];
