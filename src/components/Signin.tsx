import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthData from '../hooks/useAuthData';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { signIn } = useAuthData();

    const handleSignin: BoxProps['onSubmit'] = (event) => {
        event.preventDefault();

        signIn(email, password)
            .then(() => {
                navigate('/appointment');
            })
            .catch(() => {});

        setEmail('');
        setPassword('');
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Typography component='h1' variant='h5' sx={{ mt: '6rem' }}>
                Sign In
            </Typography>
            <Box component='form' onSubmit={handleSignin} className='login' sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id='email'
                            label='Email'
                            variant='outlined'
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id='password'
                            label='Password'
                            type='password'
                            autoComplete='current-password'
                            variant='outlined'
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Submit
                </Button>
            </Box>
        </Container>
    );
}

export default Signin;
