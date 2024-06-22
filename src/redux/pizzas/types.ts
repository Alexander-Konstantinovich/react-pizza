export type PizzaItem = {
	id: string;
	title: string;
	count: number;
	sizes: number[];
	imageUrl: string;
	price: number;
	types: number[];
	rating: number;
};

export type SearchPizzaParams = {
	category: string;
	sortBy: string;
	order: string;
	search: string;
	currentPage: string;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface PizzaInitial {
	items: PizzaItem[];
	status: Status;
}