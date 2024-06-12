import React from 'react';
import NotFound from './pages/NotFound.jsx';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import FullPizza from './pages/FullPizza.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import MainLayout from './components/layouts/MainLayout.jsx';

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/pizza/:id' element={<FullPizza />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
