import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
