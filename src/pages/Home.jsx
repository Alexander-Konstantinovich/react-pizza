import React from 'react';

import axios from 'axios';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setCurrentPage } from '../redux/slices/filterSlice';

function Home() {
	const dispatch = useDispatch(); //useDispatch возвращает нам специальную функцию и помещает в dispatch
	const { categoryId, sort, currentPage } = useSelector(state => state.filter); //Берёт из нашего store.filter, а у filter наш initialState.

	const [items, setItems] = React.useState([]);
	const { searchValue } = React.useContext(SearchContext);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';

		axios
			.get(
				`https://663e0583e1913c4767963fff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then(res => {
				setItems(res.data);
				console.log(res)
				setIsLoading(false);
			});
			

		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage]); // если будет меняться хоть одна зависимость, то делается новый запрос

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
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>

			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={number => dispatch(setCurrentPage(number))} />
		</div>
	);
}

export default Home;
