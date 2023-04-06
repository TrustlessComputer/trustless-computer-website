import { createSlice } from '@reduxjs/toolkit';
import { ConnectionType } from '@/connection';

export interface UserState {
  selectedWallet?: ConnectionType;
  walletAddressBtcTaproot?: string;
}
export const initialState: UserState = {
  selectedWallet: undefined,
  walletAddressBtcTaproot: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet;
    },
    resetUser(state) {
      state = initialState;
    },
  },
});

export const { updateSelectedWallet, resetUser } = userSlice.actions;
export default userSlice.reducer;
