import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/storage-key';
import localStorage from '@/utils/localstorage';
// import { User } from '@interfaces/user';
// import { isBrowser } from '@utils/common';
// import { walletBTCStorage } from '@/bitcoin/utils/storage';

// export const clearAccessTokenStorage = (): void => {
//   localStorage.remove(ACCESS_TOKEN);
//   localStorage.remove(REFRESH_TOKEN);
// };

export const getAccessToken = (): string | null => {
  const accessToken = localStorage.get(ACCESS_TOKEN) as string;
  return accessToken;
};

export const clearAccessTokenStorage = (): void => {
  localStorage.remove(ACCESS_TOKEN);
  localStorage.remove(REFRESH_TOKEN);
};

export const clearAuthStorage = (): void => {
  localStorage.remove(ACCESS_TOKEN);
  localStorage.remove(REFRESH_TOKEN);
  // walletBTCStorage.removeWallet();
};

export const setAccessToken = (accessToken: string, refreshToken: string): void => {
  localStorage.set(ACCESS_TOKEN, accessToken);
  localStorage.set(REFRESH_TOKEN, refreshToken);
};

// export const setUserInfo = (user: User) => {
//   if (isBrowser()) {
//     localStorage.set(LocalStorageKey.USER_ID, user.id);
//     localStorage.set(
//       LocalStorageKey.USER_WALLET_ADDRESS,
//       user.walletAddress
//     );
//     localStorage.set(LocalStorageKey.USER_AVATAR, user.avatar);
//     localStorage.set(LocalStorageKey.USER_DISPLAYNAME, user.displayName);
//   }
// };
