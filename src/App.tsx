import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Appointments from './components/Appointments';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/appointment' element={<Appointments />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
