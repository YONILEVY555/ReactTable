import { createSlice } from '@reduxjs/toolkit';

const userAcountSlice = createSlice({
  name: 'userAcountSlice',
  initialState: {
    listUserAcount:[],
  },
  reducers: {
    upadteState(state, action) {
        state.listUserAcount = action.payload
    },
  },
});

export const userAcountActions = userAcountSlice.actions;

export default userAcountSlice;