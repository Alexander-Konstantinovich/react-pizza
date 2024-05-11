import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = props => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={470}
		viewBox='0 0 280 460'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<circle cx='134' cy='136' r='125' />
		<rect x='104' y='296' rx='0' ry='0' width='1' height='0' />
		<rect x='0' y='279' rx='10' ry='10' width='280' height='23' />
		<rect x='0' y='318' rx='10' ry='10' width='280' height='88' />
		<rect x='125' y='415' rx='25' ry='25' width='150' height='45' />
		<rect x='0' y='422' rx='10' ry='10' width='95' height='30' />
	</ContentLoader>
);

export default MyLoader;
