import React from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSort } from '../redux/slices/filterSlice';

function Home() {
	const dispatch = useDispatch(); //useDispatch возвращает нам специальную функцию и помещает в dispatch
	const categoryId = useSelector(state => state.filter.category); //Берёт из нашего store.filter, а у filter наш initialState т.е. category.
	const sortType = useSelector(state => state.filter.sort);

	const [items, setItems] = React.useState([]);
	const { searchValue } = React.useContext(SearchContext);
	const [isLoading, setIsLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);


	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		fetch(
			`https://663e0583e1913c4767963fff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then(res => res.json())
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]); // если будет меняться хоть одна зависимость, то делается новый запрос

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onClickCategory={id => {
						dispatch(setCategory(id));
					}} //передаём в dispatch наш ИМПОРТИРОВАННЫЙ метод
				/>
				<Sort value={sortType} onClickSort={id => dispatch(setSort(id))} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>

			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</div>
	);
}

export default Home;
