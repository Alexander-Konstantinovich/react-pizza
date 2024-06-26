import React from 'react';
import { Link } from 'react-router-dom';

import cartEmpty from '../../assets/img/empty-cart.png';
const CartEmpty: React.FC = () => (
	<div className='cart cart--empty'>
		<h2>
			Корзина пустая <span>😕</span>
		</h2>
		<p>
			Нахал! Ты ещё не выбрал ни одной пиццы
			<br />
			Для того, чтобы заказать пиццу, перейди на главную страницу.
		</p>
		<img src={cartEmpty} alt='Empty cart' />
		<Link to='/' className='button button--black'>
			<span>Вернуться назад</span>
		</Link>
	</div>
);

export default CartEmpty;
