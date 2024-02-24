import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import CartSlice from './CartRedux/CartSlice';
import GlobalStateSlice from './GlobalStateRedux/GlobalStateSlice';

export const Store = configureStore({
  reducer: {
    cart: CartSlice,
    globalState: GlobalStateSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
