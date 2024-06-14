import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddItem, selectCartItemById } from '../../redux/slices/cartSlice';

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
	const [activeTypesValue, setActiveTypesValue] = React.useState(0); //состояние нашего типа теста
	const [activeSize, setActiveSize] = React.useState(0); // состояние размера см.
	const cartItem = useSelector(selectCartItemById(id)); //Ищем в нашем массиве items пиццу с таким же id и если он нашелся то вытаскиваем count и рендерим его
	const addedCount = cartItem ? cartItem.count : 0;
	const dispatch = useDispatch();

	const typesNames = ['тонкое', 'традиционное'];

	const onClickAdd = () => {
		const item = {
			// указываем, что у нас будет храниться в корзине внутри нашего товара
			id,
			title,
			price,
			imageUrl,
			type: typesNames[activeTypesValue],
			size: sizes[activeSize],
		};
		dispatch(setAddItem(item)); //??
	};

	return (
		<div className='pizza-block-wrapper'>
			<div className='pizza-block'>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
				<h4 className='pizza-block__title'>{title}</h4>
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
