export interface ImportMetaEnv {
  readonly VITE_MODE: string;
  readonly VITE_TC_NETWORK_RPC: string;
  readonly VITE_API_URL: string;
  readonly VITE_CDN_URL: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
