import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Appointments from './components/Appointments';
import Appointmentdetails from './components/Appointmentdetails';
import ProtectedRoute from './components/ProtectedRoute';
import Signin from './components/Signin';
import Signup from './components/Signup';

import useAuthData from './hooks/useAuthData';

import './App.css';

function App() {
    const { authenticated, loading } = useAuthData();

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='*'
                    element={<Navigate to={authenticated ? '/appointment' : '/signin'} replace />}
                />
                <Route path='/signup' element={<Signup />} />
                <Route
                    path='/appointment'
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />
                <Route path='/signin' element={<Signin />} />
                <Route
                    path='/appointment/:id'
                    element={
                        <ProtectedRoute>
                            <Appointmentdetails />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
