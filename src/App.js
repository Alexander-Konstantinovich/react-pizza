import React from 'react';
import Header from '../src/components/Header.jsx';
import NotFound from './pages/NotFound.jsx';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux' //useSelector хук, который отвечает за извлечение данных из хранилища(+-useContext)
																											 //useDispatch говорит: сделай что то
import { decrement, increment } from './redux/slices/filterSlice.js'// наши actions
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';

export const SearchContext = React.createContext();

function App() {
	const [searchValue, setSearchValue] = React.useState('');

	const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()
	return (
		<div className='wrapper'>
		<button
          aria-label="Increment value"
          onClick={() => dispatch(increment())} //через dispatch вызываем наши импортированные методы
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
			{/* <SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider> */}
		</div>
	);
}

export default App;
