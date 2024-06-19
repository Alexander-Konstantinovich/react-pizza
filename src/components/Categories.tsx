import React from 'react';

type TypeCategories = {
	value: number;
	onClickCategory: (idx: number) => void;
};
const categories = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories: React.FC<TypeCategories> = React.memo(({ value, onClickCategory }) => {
	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, i) => (
					<li
						key={i}
						onClick={() => onClickCategory(i)}
						className={value === i ? 'active' : ''}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
});

export default Categories;
