import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/';
import { Link, useNavigate } from 'react-router-dom';

import { signOut } from '../api/auth';
import useAuthData from '../hooks/useAuthData';

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
    const { user, loading } = useAuthData();
    const navigate = useNavigate();

    /* $FIXME: Maybe display a spinner if auth data is still loading? */
    if (loading) {
        return null;
    }

    if (user) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <ThemeProvider theme={theme}>
                            <Button
                                component={Link}
                                to='/appointment'
                                color='inherit'
                                sx={{ flexGrow: 1 }}
                            >
                                Home
                            </Button>
                            <Button color='inherit' sx={{ flexGrow: 1 }}>
                                Chat
                            </Button>
                            <Button color='inherit' sx={{ flexGrow: 1 }}>
                                Profile
                            </Button>
                            <Button
                                color='inherit'
                                sx={{ flexGrow: 1 }}
                                onClick={() => {
                                    signOut().then(() => {
                                        navigate('/');
                                    });
                                }}
                            >
                                Logout
                            </Button>
                        </ThemeProvider>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <ThemeProvider theme={theme}>
                        <Button component={Link} to='/signup' color='inherit' sx={{ flexGrow: 1 }}>
                            Sign up
                        </Button>
                        <Button component={Link} to='/signin' color='inherit' sx={{ flexGrow: 1 }}>
                            Sign in
                        </Button>
                    </ThemeProvider>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Menubar;
