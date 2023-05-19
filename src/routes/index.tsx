import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/pages/layout';
import Faucet from '@/pages/faucet';
import Home from '@/pages/home';
import NotFound from '@/pages/404';
import Dapps from '@/pages/dapps';
import Collection from '@/pages/collection';
import Inscription from '@/pages/inscription';
import UseTrustless from '@/pages/use-trustless-computer';
import Wallet from '@/pages/wallet';
import { ROUTE_PATH } from '@/constants/route-path';
import ConnectWallet from '@/pages/connect-wallet';
import DappsStorePage from '@/pages/store';
import EarnTC from '@/pages/earn-tc';
import Remix from '@/modules/Dapps/Remix';

export default [
  {
    path: ROUTE_PATH.NOT_FOUND,
    element: <Layout />,
    children: [{ index: true, element: <NotFound /> }],
  },
  {
    path: ROUTE_PATH.HOME,
    element: <Layout />,
    children: [{ index: true, element: <DappsStorePage /> }],
  },
  // {
  //   path: ROUTE_PATH.DAPPS,
  //   element: <Layout />,
  //   children: [{ index: true, element: <Dapps /> }],
  // },
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
  // {
  //   path: ROUTE_PATH.COLLECTION,
  //   element: <Layout />,
  //   children: [{ index: true, element: <Collection /> }],
  // },
  // {
  //   path: ROUTE_PATH.INSCRIPTION,
  //   element: <Layout />,
  //   children: [{ index: true, element: <Inscription /> }],
  // },
  {
    path: ROUTE_PATH.FAUCET,
    element: <Layout />,
    children: [{ index: true, element: <Faucet /> }],
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
    path: ROUTE_PATH.EARN_TC,
    element: <Layout />,
    children: [{ index: true, element: <EarnTC /> }],
  },
  {
    path: ROUTE_PATH.DEPLOY,
    element: <Layout />,
    children: [{ index: true, element: <Remix /> }],
  },
] as RouteObject[];
