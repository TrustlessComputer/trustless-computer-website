// When using Brave browser, `isMetaMask` is set to true when using the built-in wallet
// This variable should be true only when using the MetaMask extension
// https://wallet-docs.brave.com/ethereum/wallet-detection#compatability-with-metamask
type NonMetaMaskFlag = 'isRabby' | 'isBraveWallet' | 'isTrustWallet';
const allNonMetamaskFlags: NonMetaMaskFlag[] = ['isRabby', 'isBraveWallet', 'isTrustWallet'];
const isMetaMaskWallet = Boolean(
  window.ethereum?.isMetaMask &&
    !allNonMetamaskFlags.some(flag => {
      // @ts-ignore
      return window.ethereum?.[flag];
    }),
);

export { isMetaMaskWallet };
