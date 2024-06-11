import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setAddItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload.id); //Если в состоянии items был найден объект совпадавший по id с объектом из state.items, то...
			if (findItem) {
				findItem.count++; //увеличиваем ее значение
			} else {
				state.items.push({
					// иначе добавляем в массив
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = state.items.reduce((sum, obj) => { //складываем сумму одинаково добавленных пицц
				return obj.price * obj.count + sum;
			}, 0);
		},
		setMinusItem(state, action) {
			const findItem = state.items.find(obj => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
			}
		},
		setRemoveItem(state, action) {
			state.items = state.items.filter(obj => obj.id !== action.payload);
		},
		setClearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectCart = state => state.cart
export const selectCartItemById = id => state =>
	state.cart.items.find(obj => obj.id === id)

export const { setAddItem, setRemoveItem, setClearItems, setMinusItem } =
	cartSlice.actions;
export default cartSlice.reducer;
