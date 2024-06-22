import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://663e0583e1913c4767963fff.mockapi.io/items/` + id
				);
				setPizza(data);
			} catch (error) {
				alert('Error');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);
	console.log(pizza);

	if (!pizza) {
		return 'Loading...';
	}
	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt='Pizza' />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} p</h4>
			<Link to={'/'}>
				<button className='button button--outline button--add'>
					<span>Вернуться</span>
				</button>
			</Link>
		</div>
	);
};

export default FullPizza;
