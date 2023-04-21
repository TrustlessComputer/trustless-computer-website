import { TC_FAUCET_URL } from '@/configs';
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
    name: 'Faucet',
    externalLink: true,
    route: TC_FAUCET_URL,
    activePath: '/',
  },

  // {
  //   id: 'menu-4',
  //   name: 'Faucet',
  //   route: ROUTE_PATH.FAUCET,
  //   activePath: 'faucet',
  // },
  // {
  //   id: 'menu-5',
  //   name: 'Explorer',
  //   route: 'https://explorer.trustless.computer',
  //   activePath: 'explorer',
  //   target: '_blank',
  //   absolute: true,
  // },
];

export const MENU_MOBILE = [...MENU_HEADER];
