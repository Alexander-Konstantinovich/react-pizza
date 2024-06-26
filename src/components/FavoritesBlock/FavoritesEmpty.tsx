import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesEmpty: React.FC = () => (
	<div className='favorites favorites--empty'>
		<h2>
			Тут пусто <span>😕</span>
		</h2>
		<p>
			Ты ещё ничего не добавил в избранное. Дурак-простак
			<br />
			Для того, чтобы это сделать, перейди на главную страницу.
		</p>
		<Link to='/' className='button button--black'>
			<span>Вернуться назад</span>
		</Link>
	</div>
);

export default FavoritesEmpty;