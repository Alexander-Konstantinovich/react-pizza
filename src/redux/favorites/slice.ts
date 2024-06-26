import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFavoritesFromLS } from '../../utils/getCartFromLS';
import { TypeFavoritesItem, InitialFavorites } from './types';

const initialState: InitialFavorites = {
	itemsFav: getFavoritesFromLS(),
	totalCount: 0,
};

const FavoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		changeFavoritesItemValue(state, action: PayloadAction<TypeFavoritesItem>){
			const isItemExist = state.itemsFav.some(obj => obj.id === action.payload.id);
				if(isItemExist){
					state.itemsFav = state.itemsFav.filter(obj => obj.id !== action.payload.id);
				} else{
					state.itemsFav.push({
						...action.payload,
						count: 1,
					});
				}
		},
		setRemoveFavoriteItem(state, action: PayloadAction<string>) {
			state.itemsFav = state.itemsFav.filter(obj => obj.id !== action.payload);
		},
		setClearFavoriteItems(state) {
			state.itemsFav = [];
		},
	},
});

export const {
	setRemoveFavoriteItem,
	setClearFavoriteItems,
	changeFavoritesItemValue
} = FavoritesSlice.actions;
export default FavoritesSlice.reducer;
