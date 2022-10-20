import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Appointments from './components/Appointments';
import Signin from './components/Signin';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/appointment' element={<Appointments />} />
                <Route path='/signin' element={<Signin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
