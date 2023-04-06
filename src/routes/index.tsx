import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/pages/layout';
import Home from '@/pages/home';
import Faucet from '@/pages/faucet';
import NotFound from '@/pages/404';
import Dapps from '@/pages/dapps';
import Collection from '@/pages/collection';
import Inscription from '@/pages/inscription';
import UseTrustless from '@/pages/use-trustless-computer';
import { ROUTE_PATH } from '@/constants/route-path';

export default [
  {
    path: ROUTE_PATH.NOT_FOUND,
    element: <Layout />,
    children: [{ index: true, element: <NotFound /> }],
  },
  {
    path: ROUTE_PATH.HOME,
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: ROUTE_PATH.DAPPS,
    element: <Layout />,
    children: [{ index: true, element: <Dapps /> }],
  },
  {
    path: ROUTE_PATH.COLLECTION,
    element: <Layout />,
    children: [{ index: true, element: <Collection /> }],
  },
  {
    path: ROUTE_PATH.INSCRIPTION,
    element: <Layout />,
    children: [{ index: true, element: <Inscription /> }],
  },
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
] as RouteObject[];
