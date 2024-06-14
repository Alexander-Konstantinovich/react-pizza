import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
	return (
		<div className={styles.root}>
			<h1>Ты забыл выбрать пиццу 😡</h1>
			<p className={styles.descriptions}>Выйди и зайди нормально</p>
		</div>
	);
};

export default NotFoundBlock;
