import { RootState } from "../store";

export const selectFavorites = (state: RootState) => state.favorites;
export const selectFavoritesItemById = (id: string) => (state: RootState) =>
	state.favorites.itemsFav.some((obj) => obj.id === id);
