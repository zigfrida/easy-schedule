import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, Link } from 'react-router-dom';

const theme = createTheme();

theme.typography.button = {
    fontSize: '0.9rem',
    '@media (min-width:600px)': {
        fontSize: '1.0rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.2rem',
    },
};

function Menubar() {
    //const { role } = state;
    const { state } = useLocation();

    if (state == 'nurse') {
        console.log('hello nurse');
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <ThemeProvider theme={theme}>
                            <Button
                                component={Link}
                                to='/signup'
                                color='inherit'
                                sx={{ flexGrow: 1 }}
                            >
                                Home
                            </Button>
                            <Button color='inherit' sx={{ flexGrow: 1 }}>
                                View Appointments
                            </Button>
                            <Button color='inherit' sx={{ flexGrow: 1 }}>
                                Chat
                            </Button>
                            <Button color='inherit' sx={{ flexGrow: 1 }}>
                                Profile
                            </Button>
                        </ThemeProvider>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
    if (state == 'senior') {
        console.log('hello nurse');
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <ThemeProvider theme={theme}>
                            <Button
                                component={Link}
                                to='/signup'
                                color='inherit'
                                sx={{ flexGrow: 1 }}
                            >
                                Home
                            </Button>
                            <Button color='inherit' sx={{ flexGrow: 1 }}>
                                View Appointments
                            </Button>
                            <Button color='inherit' sx={{ flexGrow: 1 }}>
                                Chat
                            </Button>
                            <Button color='inherit' sx={{ flexGrow: 1 }}>
                                Register Appointment
                            </Button>
                            <Button color='inherit' sx={{ flexGrow: 1 }}>
                                Profile
                            </Button>
                        </ThemeProvider>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    } else {
        return (
            <Toolbar>
                <img src='../logo192.png' alt='logo' />
            </Toolbar>
        );
    }
}
export default Menubar;
