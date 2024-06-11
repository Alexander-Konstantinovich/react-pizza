import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	items: [],
	status: 'loading', //loading, success, error
};

export const fetchAddPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus', //После "/" указываем название для понимания как мы её будем использовать.
	async (params, thunkApi)=> {
		const { category, sortBy, order, search, currentPage } = params;
		const { data } = await axios.get(
			`https://663e0583e1913c4767963fff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		console.log(thunkApi.getState())
		return data;
	}
);


const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, actions) {
			state.items = actions.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAddPizzas.pending, state => {
			state.status = 'loading';
			state.items = [];
		});
		builder.addCase(fetchAddPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		});
		builder.addCase(fetchAddPizzas.rejected, state => {
			state.status = 'error';
			state.items = [];
		});
	},
});

export const selectPizzaData = state => state.pizzas

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
