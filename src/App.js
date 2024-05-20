import React from 'react';
import Header from '../src/components/Header.jsx';
import NotFound from './pages/NotFound.jsx';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';

export const SearchContext = React.createContext();

function App() {
	const [searchValue, setSearchValue] = React.useState('');
	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
