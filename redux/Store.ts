import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import CartSlice from './CartSlice';

export const Store = configureStore({
  reducer: {
    cart: CartSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
