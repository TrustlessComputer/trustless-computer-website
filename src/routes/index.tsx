import { ROUTE_PATH } from '@/constants/route-path';
import Remix from '@/modules/Dapps/Remix';
import NotFound from '@/pages/404';
import ConnectWallet from '@/pages/connect-wallet';
import Home from '@/pages/home';
import Layout from '@/pages/layout';
import DappsStorePage from '@/pages/store';
import UseTrustless from '@/pages/use-trustless-computer';
import Wallet from '@/pages/wallet';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Pioneers } from '@/pages/pioneers';

import ProtocolPage from '@/pages/protocol';
import TokensPage from '@/pages/tokens';

export default [
  {
    path: ROUTE_PATH.NOT_FOUND,
    element: <Layout />,
    children: [{ index: true, element: <NotFound /> }],
  },
  {
    path: ROUTE_PATH.HOME,
    element: <Layout />,
    children: [{ index: true, element: <ProtocolPage /> }],
  },
  {
    path: ROUTE_PATH.TOKENS,
    element: <Layout />,
    children: [{ index: true, element: <TokensPage /> }],
  },
  {
    path: ROUTE_PATH.DEVELOPER,
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: ROUTE_PATH.STORE,
    element: <Layout />,
    children: [{ index: true, element: <DappsStorePage /> }],
  },

  {
    path: ROUTE_PATH.USE_TRUSTLESS,
    element: <Layout />,
    children: [{ index: true, element: <UseTrustless /> }],
  },
  {
    path: ROUTE_PATH.WALLET,
    element: <Layout />,
    children: [{ index: true, element: <Wallet /> }],
  },
  {
    path: ROUTE_PATH.CONNECT_WALLET,
    element: <ConnectWallet />,
  },
  {
    path: ROUTE_PATH.DEPLOY,
    element: <Layout />,
    children: [{ index: true, element: <Remix /> }],
  },
  {
    path: ROUTE_PATH.PIONEERS,
    element: <Layout />,
    children: [{ index: true, element: <Pioneers /> }],
  },
] as RouteObject[];
