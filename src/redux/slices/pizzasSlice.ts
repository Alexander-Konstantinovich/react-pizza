import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

type PizzaItem = {
	id: string;
	title: string;
	count: number;
	sizes: number[];
	imageUrl: string;
	price: number;
	types: number[];
	rating: number;
};

interface PizzaInitial {
	items: PizzaItem[];
	status: 'loading' | 'success' | 'error';
}

const initialState: PizzaInitial = {
	items: [],
	status: 'loading',
};

export const fetchAddPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus', //После "/" указываем название для понимания как мы её будем использовать.
	async (params: Record<string, string>) => {
		const { category, sortBy, order, search, currentPage } = params;
		const { data } = await axios.get<CartItem[]>(
			`https://663e0583e1913c4767963fff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data as CartItem[];
	}
);

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, actions: PayloadAction<PizzaItem[]>) {
			state.items = actions.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAddPizzas.pending, state => {
			state.status = 'loading';
			state.items = [];
		});
		builder.addCase(
			fetchAddPizzas.fulfilled,
			(state, action: PayloadAction<PizzaItem[]>) => {
				state.items = action.payload;
				state.status = 'success';
			}
		);
		builder.addCase(fetchAddPizzas.rejected, state => {
			state.status = 'error';
			state.items = [];
		});
	},
});

export const selectPizzaData = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
