/// <reference types="vite/client" />
declare const DOT_ENV: any;

interface Window {
  // walletLinkExtension is injected by the Coinbase Wallet extension
  walletLinkExtension?: any;
  // @ts-ignore
  ethereum?: {
    // value that is populated and returns true by the Coinbase Wallet mobile dapp browser
    isCoinbaseWallet?: true;
    isMetaMask?: true;
    isTally?: false;
    autoRefreshOnNetworkChange?: boolean;
    request: any;
  };
  // @ts-ignore
  web3?: Record<string, unknown>;
}
