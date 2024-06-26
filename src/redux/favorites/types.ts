export type TypeFavoritesItem = {
	id: string;
	title: string;
	count: number;
	size: number;
	imageUrl: string;
	price: number;
	type: string;
};

export interface InitialFavorites {
	itemsFav: TypeFavoritesItem[];
	totalCount: number;
}