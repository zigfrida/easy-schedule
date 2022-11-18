import Alert from '@mui/material/Alert';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import useAuthData from '../hooks/useAuthData';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { signIn } = useAuthData();

    const handleSignin: BoxProps['onSubmit'] = (event) => {
        event.preventDefault();

        signIn(email, password)
            .then(() => {
                navigate('/appointment');
            })
            .catch(() => {
                setErrorMsg('Sign in failed. Please try again.');
            });

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
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Link href='/signup' variant='body2'>
                            Create a new account - Sign up
                        </Link>
                    </Grid>
                </Grid>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Submit
                </Button>
            </Box>

            {errMsg && (
                <Alert
                    style={{ marginTop: '10px' }}
                    variant='outlined'
                    severity='error'
                    onClose={() => setErrorMsg('')}
                >
                    {errMsg}
                </Alert>
            )}
        </Container>
    );
}

export default Signin;
