import { TC_NETWORK_RPC } from '@/configs';

export enum SupportedChainId {
  MAINNET = 1,
  GOERLI = 5,
  POLYGON_MUMBAI = 80001,
  TRUSTLESS_COMPUTER = 22213,
}

export const TRUSTLESS_COMPUTER_CHAIN_INFO = {
  name: 'Trustless Computer',
  title: '',
  chain: 'TC',
  icon: '',
  rpc: [TC_NETWORK_RPC],
  faucets: [],
  nativeCurrency: {
    name: 'JUICE',
    symbol: 'JUICE',
    decimals: 18,
  },
  infoURL: 'https://trustless.computer',
  shortName: 'TC',
  chainId: SupportedChainId.TRUSTLESS_COMPUTER,
  networkId: SupportedChainId.TRUSTLESS_COMPUTER,
  slip44: 0,
  explorers: [
    {
      name: 'Trustless computer explorer',
      url: 'https://explorer.trustless.computer',
      standard: 'EIP3091',
    },
  ],
  ens: {
    registry: '',
  },
};
