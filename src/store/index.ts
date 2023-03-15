import { configureStore } from '@reduxjs/toolkit';

import user from '@/store/apps/user';
import permissions from '@/store/apps/permissions';

export const store = configureStore({
  reducer: {
    user,
    permissions,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
