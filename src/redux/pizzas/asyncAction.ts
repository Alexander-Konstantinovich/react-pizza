import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PizzaItem } from './types';

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
