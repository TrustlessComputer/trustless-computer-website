import isEmpty from 'lodash/isEmpty';

interface IENVS {
  REACT_APP_ENV: string;
  REACT_APP_API_SERVICE: string;
  REACT_APP_API_FAUCET: string;
}

const defaultEnvs = {
  REACT_APP_ENV: 'production',
  REACT_APP_API_SERVICE: '',
  REACT_APP_API_FAUCET: '',
};

export const getEnvs = () => {
  let envs: any = {};
  try {
    const PROCESS_ENV = DOT_ENV;
    if (!isEmpty(PROCESS_ENV)) {
      Object.keys(PROCESS_ENV).forEach((key: string) => {
        const value = PROCESS_ENV[key];
        if (value === 'true' || value === 'false') {
          envs[key] = value === 'true';
        } else {
          envs[key] = PROCESS_ENV[key];
        }
        return key;
      });
    }
  } catch (error) {
    console.debug(error);
  } finally {
    envs = isEmpty(envs) ? defaultEnvs : envs;
  }
  return { ...envs, REACT_APP_DOMAIN_URL: window.location.origin };
};

export const ENVS: IENVS = getEnvs();

// @ts-ignore
export const isMainnet: boolean = ENVS.REACT_APP_ENV === 'production';

export const API_SERVICE = ENVS.REACT_APP_API_SERVICE;
export const API_FAUCET = ENVS.REACT_APP_API_FAUCET;
