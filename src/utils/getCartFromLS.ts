export const getCartFromLS = () => {
	const data = localStorage.getItem('cart');
	return data ? JSON.parse(data) : [];
};

export const getFavoritesFromLS = () => {
	const data = localStorage.getItem('favorites');
	return data ? JSON.parse(data) : [];
};
