import React from 'react';
import routes from '@/routes/index';
import { useRoutes } from 'react-router-dom';
import Web3Provider from '@/components/Web3Provider';
import { Provider } from 'react-redux';
import store from '@/state';
import { WalletProvider } from '@/contexts/wallet-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider, { ThemedGlobalStyle } from '@/theme/theme';
import './reset.scss';
import '@/styles/index.scss';

const App = () => {
  const element = useRoutes(routes);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemedGlobalStyle />
        <Web3Provider>
          <WalletProvider>{element}</WalletProvider>
        </Web3Provider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
