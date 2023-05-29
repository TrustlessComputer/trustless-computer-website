import { ROUTE_PATH } from '@/constants/route-path';

export const MENU_HEADER = [
  {
    id: 'menu-1',
    name: 'Bitcoin Dapp Store',
    route: ROUTE_PATH.STORE,
    activePath: '',
  },
  {
    id: 'menu-2',
    name: 'Developers',
    route: ROUTE_PATH.DEVELOPER,
    activePath: 'developer',
  },
  {
    id: 'menu-3',
    name: 'Get TC',
    externalLink: true,
    route: 'https://tcgasstation.com/',
    activePath: '/',
  },
];

export const MENU_MOBILE = [...MENU_HEADER];
