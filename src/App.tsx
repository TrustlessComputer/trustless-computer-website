import React from 'react';
import routes from '@/routes/index';
import { useRoutes } from 'react-router-dom';
import Web3Provider from '@/components/Web3Provider';
import { Provider } from 'react-redux';
import store from '@/state';
import { WalletProvider } from '@/contexts/wallet-context';
import { XverseProvider } from '@/contexts/xverse-context';
import { AssetsProvider } from './contexts/assets-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider, { ThemedGlobalStyle } from '@/theme/theme';
import { Toaster } from 'react-hot-toast';
import './reset.scss';
import '@/styles/index.scss';

const App: React.FC = (): React.ReactElement => {
  const element = useRoutes(routes);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemedGlobalStyle />
        <Web3Provider>
          <XverseProvider>
            <WalletProvider>
              <AssetsProvider>{element}</AssetsProvider>
              <Toaster position="top-center" reverseOrder={false} />
            </WalletProvider>
          </XverseProvider>
        </Web3Provider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
