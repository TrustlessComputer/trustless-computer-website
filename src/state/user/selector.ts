import { UserState } from '@/state/user/reducer';
import { RootState } from '@/state';

export const getUserSelector = (state: RootState): UserState | null => state.user;

export const getIsAuthenticatedSelector = (state: RootState): boolean =>
  !!state.user.walletAddress && !!state.user.walletAddressBtcTaproot;
