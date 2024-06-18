import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

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

export type SearchPizzaParams = {
	category: string;
	sortBy: string;
	order: string;
	search: string;
	currentPage: string;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaInitial {
	items: PizzaItem[];
	status: Status;
}

const initialState: PizzaInitial = {
	items: [],
	status: Status.LOADING,
};

export const fetchAddPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus', //После "/" указываем название для понимания как мы её будем использовать.
	async (params: Record<string, string>) => {
		const { category, sortBy, order, search, currentPage } = params;
		const { data } = await axios.get<PizzaItem[]>(
			`https://663e0583e1913c4767963fff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data as PizzaItem[];
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
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchAddPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchAddPizzas.rejected, state => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export const selectPizzaData = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
