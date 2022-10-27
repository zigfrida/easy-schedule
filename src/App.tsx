import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Appointments from './components/Appointments';
import Signin from './components/Signin';
import Appointmentdetails from './components/Appointmentdetails';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/appointment' element={<Appointments />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/appointment/:id' element={<Appointmentdetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
