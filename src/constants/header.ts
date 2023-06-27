import { ROUTE_PATH } from '@/constants/route-path';

export const MENU_HEADER = [
  {
    id: 'menu-1',
    name: 'Protocol',
    route: ROUTE_PATH.PROTOCOL,
    activePath: '',
  },
  // {
  //   id: 'menu-2',
  //   name: 'Computer',
  //   route: ROUTE_PATH.COMPUTER,
  //   activePath: ROUTE_PATH.COMPUTER,
  // },
  {
    id: 'menu-3',
    name: 'Tokens',
    route: ROUTE_PATH.TOKENS,
    activePath: ROUTE_PATH.TOKENS,
  },
  {
    id: 'menu-4',
    name: 'Dapp Store',
    route: ROUTE_PATH.STORE,
    activePath: ROUTE_PATH.STORE,
  },
  // {
  //   id: 'menu-3',
  //   name: 'Developers',
  //   route: ROUTE_PATH.DEVELOPER,
  //   activePath: 'developer',
  // },
];

export const MENU_MOBILE = [...MENU_HEADER];
