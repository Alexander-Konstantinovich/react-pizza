import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategory(state, action) {
			//type: 'filters/setCategory'
			state.categoryId = action.payload; // В state мы сохраняем то, что нам придёт в action.payload
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
	},
});

export const { setCategory, setSort } = filterSlice.actions; // Вытаскиваем наш метод из объекта и преобразовываем его в константу.
export default filterSlice.reducer;
