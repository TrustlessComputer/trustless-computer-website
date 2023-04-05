import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/pages/layout';
import Home from '@/pages/home';
import Faucet from '@/pages/faucet';
import NotFound from '@/pages/404';
import Dapps from '@/pages/dapps';
import Collection from '@/pages/collection';
import Inscription from '@/pages/inscription';

export default [
  {
    path: '/404',
    element: <Layout />,
    children: [{ index: true, element: <NotFound /> }],
  },
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/dapps',
    element: <Layout />,
    children: [{ index: true, element: <Dapps /> }],
  },
  {
    path: '/collection',
    element: <Layout />,
    children: [{ index: true, element: <Collection /> }],
  },
  {
    path: '/inscription',
    element: <Layout />,
    children: [{ index: true, element: <Inscription /> }],
  },
  {
    path: '/faucet',
    element: <Layout />,
    children: [{ index: true, element: <Faucet /> }],
  },
] as RouteObject[];
