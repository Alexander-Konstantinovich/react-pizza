import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search:React.FC = () => {
	const [value, setValue] = React.useState(''); // локальный state
	const dispatch = useDispatch();
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue(''); // локальная очистка

		//document.querySelector('input').focus()

		inputRef.current?.focus(); //проверка на отсутствие возможного null в useRef
	}; //сохранили ссылку на функцию в переменную и сделали её отложенной для того,
	//чтобы она не пересоздавалась каждый раз.
	const updateSearchValue = React.useCallback(
		debounce((str:string) => {
			dispatch(setSearchValue(str));
		}, 250),
		[]
	);

	const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z' />
			</svg>
			<input
				ref={inputRef}
				className={styles.input}
				placeholder='Введите название пиццы...'
				value={value}
				onChange={onChangeInput} //Получение наших значений вводимых в input и передача в нашу функцию состояния
			/>
			{value && (
				<svg
					className={styles.clear}
					onClick={onClickClear}
					height='48'
					viewBox='0 0 48 48'
					width='48'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z' />
					<path d='M0 0h48v48H0z' fill='none' />
				</svg>
			)}
		</div>
	);
};

export default Search;
