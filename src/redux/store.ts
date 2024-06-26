import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './filter/slice';
import cart from './cart/slice';
import pizzas from './pizzas/slice';
import favorites from './favorites/slice'

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizzas,
		favorites,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
