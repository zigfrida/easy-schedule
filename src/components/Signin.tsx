import { Box, BoxProps, Button, Container, TextField, Typography } from '@mui/material/';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../api/auth';

//  import { createFirebaseDao } from '../api/dao';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const [uuid, setUuid] = useState('');

    const handleSignin: BoxProps['onSubmit'] = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(email, password)
            .then(() => {
                // console.log(userCredential);

                navigate('/menubar', { state: 'senior' });
            })
            .catch(() => {});

        setEmail('');
        setPassword('');
    };

    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
            }}
        >
            <Box
                component='form'
                onSubmit={handleSignin}
                className='login'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    rowGap: '10px',
                }}
            >
                <Typography component='h1' variant='h5' style={{ alignSelf: 'center' }}>
                    Sign In
                </Typography>

                <TextField
                    required
                    id='email'
                    label='Email'
                    variant='outlined'
                    onChange={(event) => setEmail(event.target.value)}
                />

                <TextField
                    required
                    id='password'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    variant='outlined'
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button type='submit' fullWidth variant='contained'>
                    Submit
                </Button>
            </Box>
        </Container>
    );
}

export default Signin;
