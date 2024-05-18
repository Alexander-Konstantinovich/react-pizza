import React from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

function Home() {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({
		name: 'популярности', //по умолчанию при запуске
		sortProperty: 'rating',
	});

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-')?'asc':'desc';

		fetch(
			`https://663e0583e1913c4767963fff.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
		)
			.then(res => res.json())
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType]); // если будет меняться хоть одна зависимость, то делается новый запрос

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId} //передаём состояние дочернему элементу.
					onClickCategory={i => setCategoryId(i)}
				/>
				<Sort value={sortType} onClickSort={i => setSortType(i)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>

			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</div>
	);
}

export default Home;
