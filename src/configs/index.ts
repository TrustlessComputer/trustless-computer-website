const ENVS = import.meta.env;

// App configs
export const APP_ENV: string = ENVS.VITE_MODE;
export const API_URL: string = ENVS.VITE_API_URL;
export const TC_NETWORK_RPC: string = ENVS.VITE_TC_NETWORK_RPC;
export const CDN_URL: string = ENVS.VITE_CDN_URL;
export const API_FAUCET: string = ENVS.VITE_API_FAUCET;

// Contract configs
export const ARTIFACT_CONTRACT: string = ENVS.VITE_ARTIFACT_CONTRACT;
export const BNS_CONTRACT: string = ENVS.VITE_BNS_CONTRACT;
export const BFS_ADDRESS: string = ENVS.VITE_BFS_CONTRACT;

export const TC_URL: string = ENVS.VITE_TC_URL;
export const TRANSFER_TX_SIZE = 1000;
export const TC_FAUCET_URL = ENVS.VITE_TC_FAUCET;
