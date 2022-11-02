import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'formSlice',
  initialState: { dataforUpdate: null,
                  showForm: false,
                  status: 'Add'},
  reducers: {
    updateShowForm(state, action) {
         state.showForm = action.payload
    },
    updateDataforUpdate(state, action) {
        state.dataforUpdate = action.payload
   },
   setStatus(state, action) {
    state.status = action.payload
   },
  },
});

export const formActions = formSlice.actions;

export default formSlice;