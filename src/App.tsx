import React from 'react';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/Home';
const Cart = React.lazy(
	() => import(/*webpackChunkName: "Cart"*/ './pages/Cart')
);
const FullPizza = React.lazy(
	() => import(/*webpackChunkName: "Cart"*/ './pages/FullPizza')
);
const NotFound = React.lazy(
	() => import(/*webpackChunkName: "Cart"*/ './pages/NotFound')
);

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='/' element={<Home />} />
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
