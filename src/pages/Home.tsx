import React from 'react';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { sortList } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import {
	setCategory,
	setCurrentPage,
	setFilters,
	selectFilter,
} from '../redux/slices/filterSlice';
import {
	SearchPizzaParams,
	fetchAddPizzas,
	selectPizzaData,
} from '../redux/slices/pizzasSlice';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false); //Указываем первый рендер false
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);

	const { items, status } = useSelector(selectPizzaData);

	const fetchPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';
		// @ts-ignore
		dispatch(fetchAddPizzas({ category, sortBy, order, search, currentPage })); //получает данные и сразу их сохраняет
		window.scrollTo(0, 0);
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
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as SearchPizzaParams;
			const sort = sortList.find(obj => obj.sortProperty === params.sortBy);
			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || sortList[0],
				})
			);
		}
		isSearch.current = true;
	}, []);

	//Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		fetchPizzas();

		isSearch.current = false;

		window.scrollTo(0, 0);
	}, [categoryId, sort, searchValue, currentPage]);

	const pizzas = items.map((obj: any) => (
			<PizzaBlock {...obj} />
	));
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onClickCategory={(id: number) => {
						dispatch(setCategory(id));
					}} //передаём в dispatch наш ИМПОРТИРОВАННЫЙ метод
				/>
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error--info'>
					<h2>Error 😕</h2>
					<p>Try again later</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}

			<Pagination
				currentPage={currentPage}
				onChangePage={(page: number) => dispatch(setCurrentPage(page))}
			/>
		</div>
	);
};

export default Home;
