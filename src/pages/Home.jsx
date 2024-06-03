import React from 'react';

import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { sortList } from '../components/Sort';

import { useSelector, useDispatch } from 'react-redux';
import {
	setCategory,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';

function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch(); //useDispatch возвращает нам специальную функцию и помещает в dispatch
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false); //Указываем первый рендер false
	const { categoryId, sort, currentPage } = useSelector(state => state.filter); //Берёт из нашего store.filter, а у filter наш initialState.

	const [items, setItems] = React.useState([]);
	const { searchValue } = React.useContext(SearchContext);
	const [isLoading, setIsLoading] = React.useState(true);

	const fetchPizzas = () => {
		setIsLoading(true);
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
				setIsLoading(false);
			});
	};

	// в случае отсутствия первого рендера, не вшиваем наши параметры в наш URL
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`); //передаём ? т.к. он не возвращается и вшиваем всё в адресную строку
		}
		isMounted.current = true;
	}, [categoryId, sort, currentPage]);

	//Если был первый рендер, то проверяем URL и сохраняем в redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)); // удаляем наш "?"
			const sort = sortList.find(
				obj => obj.sortProperty === params.sortProperty
			); //?????????
			dispatch(
				setFilters({
					//сохраняем наши параметры в redux
					...params,
					sort, //??
				})
			);
			isSearch.current = true;
		}
	}, []);

	//Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;

		window.scrollTo(0, 0);
	}, [categoryId, sort, searchValue, currentPage]);

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
			<Pagination
				currentPage={currentPage}
				onChangePage={number => dispatch(setCurrentPage(number))}
			/>
		</div>
	);
}

export default Home;
