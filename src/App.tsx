import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Appointmentdetails from './components/Appointmentdetails';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/appointmentdetails' element={<Appointmentdetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
