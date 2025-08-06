import { configureStore } from '@reduxjs/toolkit';
import timelineReducer from './timelineSlice';
import polygonReducer from './polygonSlice';
import dataSourceReducer from './dataSourceSlice';

export const store = configureStore({
  reducer: {
    timeline: timelineReducer,
    polygons: polygonReducer,
    dataSource: dataSourceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
