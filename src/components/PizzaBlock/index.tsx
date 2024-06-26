import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/types';
import { selectCartItemById } from '../../redux/cart/selector';
import { Link } from 'react-router-dom';
import { TypeFavoritesItem } from '../../redux/favorites/types';
import { changeFavoritesItemValue } from '../../redux/favorites/slice';
import { selectFavoritesItemById } from '../../redux/favorites/selector';

type TypePizzaBlock = {
	id: string;
	title: string;
	count: number;
	sizes: number[];
	imageUrl: string;
	price: number;
	types: number[];
};

const PizzaBlock: React.FC<TypePizzaBlock> = ({
	id,
	title,
	price,
	imageUrl,
	sizes,
	types,
}) => {
	const [activeTypesValue, setActiveTypesValue] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);
	const cartItem = useSelector(selectCartItemById(id));
	const isFavorite = useSelector(selectFavoritesItemById(id));
	const addedCount = cartItem ? cartItem.count : 0;
	const dispatch = useDispatch();

	const typesNames = ['тонкое', 'традиционное'];

	const onClickAdd = () => {
		const item: CartItem = {
			id,
			title,
			price,
			imageUrl,
			type: typesNames[activeTypesValue],
			size: sizes[activeSize],
			count: 0,
		};
		dispatch(setAddItem(item));
	};

	const onChangeFavorites = () => {
		const itemFavorites: TypeFavoritesItem = {
			id,
			title,
			price,
			imageUrl,
			type: typesNames[activeTypesValue],
			size: sizes[activeSize],
			count: 0,
		};
		dispatch(changeFavoritesItemValue(itemFavorites));
	};

	return (
		<div className='pizza-block-wrapper'>
			<div className='pizza-block'>
				<Link key={id} to={`pizza/${id}`}>
					<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
					<h4 className='pizza-block__title'>{title}</h4>
				</Link>
				<div className='pizza-block__selector'>
					<ul>
						{types.map(type => (
							<li
								onClick={() => setActiveTypesValue(type)}
								className={activeTypesValue === type ? 'active' : ''}
								key={type}
							>
								{type === 0 ? typesNames[0] : typesNames[1]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((value, i) => (
							<li
								onClick={() => setActiveSize(i)}
								key={value}
								className={activeSize === i ? 'active' : ''}
							>
								{value}см.
							</li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {price}</div>

					<button
						onClick={onChangeFavorites}
						className={`button button--outline ${
							isFavorite
								? 'button--favorites__item--active'
								: 'button--favorites__item'
						}`}
					>
						<svg
							width='20'
							height='20'
							viewBox='0 0 23 22'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
						>
							<path d='M23.3,8.6c0,5.2-7.7,10.6-10.3,12.4c-0.6,0.4-1.3,0.4-1.8,0C8.4,19.3,0.8,13.8,0.8,8.6c0-3.3,2.6-5.9,5.9-5.9   c2.4,0,4.4,1.4,5.4,3.4c0.9-2,3-3.4,5.4-3.4C20.6,2.7,23.3,5.4,23.3,8.6z' />
						</svg>
					</button>

					<button
						onClick={onClickAdd}
						className='button button--outline button--add'
					>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>{' '}
						{/*Если > 0, то только тогда рендерим первую часть*/}
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PizzaBlock;
