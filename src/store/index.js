import { configureStore } from '@reduxjs/toolkit';
import userAcountSlice from './slice/userAcountSlice'
import organizationUsersSlice from './slice/organizationUsersSlice';
import notificationSlice from './slice/notificationSlice'
import formSlice from './slice/formSlice';

const store = configureStore({

  reducer: { organizationUsers: organizationUsersSlice.reducer,
             notification: notificationSlice.reducer,
             userAcount: userAcountSlice.reducer,
             form: formSlice.reducer},
}

);

export default store;