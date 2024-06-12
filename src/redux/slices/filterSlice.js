import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
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
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setFilters(state, action) {
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

export const selectSort = state => state.filter.sort;
export const selectFilter = state => state.filter;

export const {
	setCategory,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions; // Вытаскиваем наш метод из объекта и преобразовываем его в константу.
export default filterSlice.reducer;
