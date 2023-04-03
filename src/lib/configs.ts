const ENVS = import.meta.env;

const isMainnet: boolean = ENVS.VITE_MODE === 'production';

export { isMainnet };
