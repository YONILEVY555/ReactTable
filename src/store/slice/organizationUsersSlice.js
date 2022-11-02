import { createSlice } from '@reduxjs/toolkit';

const organizationUsersSlice = createSlice({
  name: 'organizationUsersSlice',
  initialState: {
    listOrganizationUsers: [],
    pageCount: null,
    pageCurrent: null
  },
  reducers: {
    f1(state, action) {
      state.listOrganizationUsers = action.payload.listOrganizationUsers
      state.pageCount = action.payload.pageCount
      state.pageCurrent = action.payload.pageCurrent
    },
    deleteRow(state, action) {
      state.listOrganizationUsers = state.listOrganizationUsers.filter(item => item.userId != action.payload )
    },
    addRow(state, action) {
      state.listOrganizationUsers = [action.payload,...state.listOrganizationUsers]
    },
    updateRow(state, action) {
      const index = state.listOrganizationUsers.findIndex((i)=>i.userId === action.payload.userId)
      const updateList = [...state.listOrganizationUsers]
      updateList[index] = action.payload
      state.listOrganizationUsers = updateList
    }
  },
});

export const organizationUsersActions = organizationUsersSlice.actions;

export default organizationUsersSlice;

