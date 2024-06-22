import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	SortPropertyEnum,
	Sort,
	FilterInitial,
} from './types'


const initialState: FilterInitial = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.RATING_DESC,
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategory(state, action: PayloadAction<number>) {
			//type: 'filters/setCategory'
			state.categoryId = action.payload; // В state мы сохраняем то, что нам придёт в action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterInitial>) {
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});



export const {
	setCategory,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions; // Вытаскиваем наш метод из объекта и преобразовываем его в константу.
export default filterSlice.reducer;