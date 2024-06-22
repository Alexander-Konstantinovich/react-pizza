export type CartItem = {
	id: string;
	title: string;
	count: number;
	size: number;
	imageUrl: string;
	price: number;
	type: string;
};

export interface InitialCart {
	totalPrice: number;
	items: CartItem[];
}