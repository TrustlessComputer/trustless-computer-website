import { ROUTE_PATH } from '@/constants/route-path';

export const MENU_HEADER = [
  {
    id: 'menu-1',
    name: 'Developer',
    route: ROUTE_PATH.HOME,
    activePath: '',
  },
  {
    id: 'menu-2',
    name: 'Use Trustless Computer',
    route: ROUTE_PATH.USE_TRUSTLESS,
    activePath: 'use-trustless-computer',
  },
  {
    id: 'menu-3',
    name: 'Bitcoin Dapps',
    route: ROUTE_PATH.DAPPS,
    activePath: 'dapps',
  },
  {
    id: 'menu-4',
    name: 'Explorer',
    route: 'https://explorer.trustless.computer',
    activePath: 'explorer',
    target: '_blank',
  },
];

export const MENU_MOBILE = [...MENU_HEADER];
