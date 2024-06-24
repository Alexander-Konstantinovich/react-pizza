import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PizzaInitial, Status, PizzaItem } from './types';
import { fetchAddPizzas } from './asyncAction';

const initialState: PizzaInitial = {
	items: [],
	status: Status.LOADING,
};

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

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
