import React from 'react';
import { Link } from 'react-router-dom';
import FavoritesItem from '../components/FavoritesBlock/FavoritesItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '../redux/favorites/selector';
import { setClearFavoriteItems } from '../redux/favorites/slice';
import FavoritesEmpty from '../components/FavoritesBlock/FavoritesEmpty';

const Favorites: React.FC = () => {

	const dispatch = useDispatch();
	const { itemsFav } = useSelector(selectFavorites);
	const totalCount = itemsFav.reduce((sum:number, item:any) => {
		return sum + item.count;
	}, 0);
	const onClickClear = () => {
		if (window.confirm('Are you sure you want to remove all favorites?')) {
			dispatch(setClearFavoriteItems());
		}
	};

	if (itemsFav.length===0) { 
		return <FavoritesEmpty />;
	}

	return (
		<div className='container'>
			<div className='favorites'>
				<div className='favorites__top'>
					<h2 className='content__title'>
						Избранное
						<svg
							height='519px'
							version='1.1'
							viewBox='0 0 519 519'
							width='519px'
							xmlns='http://www.w3.org/2000/svg'
						>
							<title />
							<desc />
							<defs>
								<radialGradient
									cx='50%'
									cy='21.9311119%'
									fx='50%'
									fy='21.9311119%'
									id='radialGradient-1'
									r='87.8884669%'
								>
									<stop offset='0%' stopColor='#F25674' />
									<stop offset='100%' stopColor='#D82D4E' />
								</radialGradient>
							</defs>
							<g
								fill='none'
								fillRule='evenodd'
								id='Page-1'
								stroke='none'
								strokeWidth='1'
							>
								<g
									id='Artboard'
									transform='translate(-1565.000000, -821.000000)'
								>
									<g
										id='Group-9'
										transform='translate(1565.000000, 821.000000)'
									>
										<circle
											cx='259.5'
											cy='259.5'
											fill='url(#radialGradient-1)'
											id='Oval'
											r='259.5'
										/>
										<path
											d='M258.000119,408 C255.551702,408 253.103524,407.215294 251.051624,405.645881 C191.99909,368.097647 152.694533,335.304181 133.137953,307.265484 L131.441172,304.821634 L130.199526,303.016418 C116.741002,283.359364 101,257.277789 101,231.469043 C101,182.056655 140.74583,142 189.774795,142 C216.923081,142 241.225111,154.281575 257.509135,173.632531 L257.999869,174.221082 C274.28423,154.53094 298.802694,142 326.225205,142 C375.25417,142 415,182.056655 415,231.469043 C415,257.809928 398.603193,284.435009 384.971058,304.224066 L384.558828,304.821634 L382.862047,307.265484 C363.305467,335.304181 324.00091,368.097647 264.948376,405.645881 C262.896476,407.215294 260.448298,408 258.000119,408 Z'
											fill='#FFFFFF'
											id='Path'
										/>
									</g>
								</g>
							</g>
						</svg>
					</h2>
					<div onClick={onClickClear} className='favorites__clear'>
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M2.5 5H4.16667H17.5'
								stroke='#B6B6B6'
								strokeWidth='1.2'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>
							<path
								d='M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z'
								stroke='#B6B6B6'
								strokeWidth='1.2'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>
							<path
								d='M8.33337 9.16667V14.1667'
								stroke='#B6B6B6'
								strokeWidth='1.2'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>
							<path
								d='M11.6666 9.16667V14.1667'
								stroke='#B6B6B6'
								strokeWidth='1.2'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>
						</svg>

						<span>Очистить избранное</span>
					</div>
					{/* <div onClick={onClickClear} className='cart__clear'> */}
				</div>
			</div>
			<div className='content__items--favorites'>
				{itemsFav.map((item:any) => (
						<FavoritesItem key={item.id} {...item} />
					))}
			</div>
			<div className='favorites__bottom'>
				<div className='favorites__bottom-details'>
					<span>
						{' '}
							Всего в избранном: <b>{totalCount} шт.</b>{' '}
					</span>
				</div>
				<div className='favorites__bottom-buttons'>
					<Link
						to='/'
						className='button button--outline button--add go-back-btn'
					>
						<svg
							width='8'
							height='14'
							viewBox='0 0 8 14'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M7 13L1 6.93015L6.86175 1'
								stroke='#D3D3D3'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>
						</svg>

						<span>Вернуться назад</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Favorites;
