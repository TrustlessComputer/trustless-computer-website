import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/storage-key';
import localStorage from '@/utils/localstorage';

export const clearAccessTokenStorage = (): void => {
  localStorage.remove(ACCESS_TOKEN);
  localStorage.remove(REFRESH_TOKEN);
};
