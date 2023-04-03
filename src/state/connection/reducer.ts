import { createSlice } from '@reduxjs/toolkit';
import { ConnectionType } from '@/connection';

interface ConnectionState {
  errorByConnectionType: Record<ConnectionType, string | undefined>;
}

const initialState: ConnectionState = {
  errorByConnectionType: {
    [ConnectionType.METAMASK]: undefined,
  },
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    updateConnectionError(
      state,
      {
        payload: { connectionType, error },
      }: { payload: { connectionType: ConnectionType; error: string | undefined } },
    ) {
      state.errorByConnectionType[connectionType] = error;
    },
  },
});

export const { updateConnectionError } = connectionSlice.actions;
export default connectionSlice.reducer;
