import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/pages/layout';
import Home from '@/pages/home';
// import Faucet from '@/pages/faucet';
import NotFound from '@/pages/404';

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
    path: '/*',
    element: <NotFound />,
  },
] as RouteObject[];
