import React from 'react';
import './scss/app.scss';

import Header from '../src/components/Header.jsx';
import Categories from './components/Categories.jsx';
import Skeleton from './components/PizzaBlock/Skeleton.jsx';
import PizzaBlock from './components/PizzaBlock/index.jsx';
import Sort from './components/Sort.jsx';

function App() {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		fetch('https://663e0583e1913c4767963fff.mockapi.io/items')
			.then(res => {
				return res.json();
			})
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
			});
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{isLoading
							? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
							: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
