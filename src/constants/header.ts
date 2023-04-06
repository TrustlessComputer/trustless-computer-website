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
    name: 'Bitcoin Dapps',
    route: ROUTE_PATH.DAPPS,
    activePath: 'dapps',
  },
  {
    id: 'menu-3',
    name: 'Faucet',
    route: ROUTE_PATH.FAUCET,
    activePath: 'faucet',
  },
  {
    id: 'menu-4',
    name: 'Explorer',
    route: 'https://explorer.trustless.computer',
    activePath: 'explorer',
  },
];

export const MENU_MOBILE = [...MENU_HEADER];
