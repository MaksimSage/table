import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '../store/companySlice';

export const store = configureStore({
  reducer: {
    data: companyReducer,
  },
});
