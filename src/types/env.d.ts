export interface ImportMetaEnv {
  readonly REACT_APP_ENV: string;
  readonly REACT_APP_API_SERVICE: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
