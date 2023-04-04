import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/pages/layout';
import Home from '@/pages/home';
// import Faucet from '@/pages/faucet';
import NotFound from '@/pages/404';
import Dapps from '@/pages/dapps';

export default [
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  // {
  //   path: '/faucet',
  //   element: <Layout />,
  //   children: [{ index: true, element: <Faucet /> }],
  // },
  {
    path: '/dapps',
    element: <Layout />,
    children: [{ index: true, element: <Dapps /> }],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
] as RouteObject[];
