import React from 'react';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
const Cart = React.lazy(
	() => import(/*webpackChunkName: "Cart"*/ './pages/Cart')
);
const FullPizza = React.lazy(
	() => import(/*webpackChunkName: "FullPizza"*/ './pages/FullPizza')
);
const NotFound = React.lazy(
	() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound')
);

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/favorites' element={<Favorites />} />
				<Route
					path='/cart'
					element={
						<React.Suspense fallback={<div>Loading...</div>}>
							<Cart />
						</React.Suspense>
					}
				/>
				<Route
					path='/pizza/:id'
					element={
						<React.Suspense fallback={<div>Loading...</div>}>
							<FullPizza />
						</React.Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<React.Suspense fallback={<div>Loading...</div>}>
							<NotFound />
						</React.Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
