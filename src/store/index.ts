import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from '../modules/layout/sidebarSlice'
import parliamentReducer from "src/modules/parliament/parliamentSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    parliaments: parliamentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
