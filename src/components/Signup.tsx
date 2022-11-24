import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box, { BoxProps } from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { UserType } from '../types';

import { userDao } from '../api/collections';
import useAuthData from '../hooks/useAuthData';

function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState<UserType>('senior');
    const [errMsg, setErrorMsg] = useState('');
    const { signUp } = useAuthData();

    const validatePassword = () => !(password.trim() === '' || password.length < 8);

    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
        setUserType(event.target.value as UserType);
    };

    const handleSubmit: BoxProps['onSubmit'] = (event) => {
        event.preventDefault();
        if (validatePassword()) {
            signUp(email, password)
                .then((registeredUser) => {
                    const { uid } = registeredUser.user;
                    userDao.add(uid, {
                        uid,
                        firstName,
                        lastName,
                        email,
                        address,
                        userType,
                    });

                    navigate('/signin');
                })
                .catch((e) => {
                    setErrorMsg(`Registration failed. Please try again. ${e}`);
                });
        } else {
            setErrorMsg(
                'Registration failed. Enter a password that is more than eight characters.',
            );
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Typography component='h1' variant='h5' sx={{ mt: '6rem' }}>
                Sign up
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete='given-name'
                            name='firstName'
                            required
                            fullWidth
                            id='firstName'
                            label='First Name'
                            autoFocus
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id='lastName'
                            label='Last Name'
                            name='lastName'
                            autoComplete='family-name'
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='new-password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            color='primary'
                            value={userType}
                            exclusive
                            // @ts-expect-error $FIXME: ignoring this TS error for now due to time constraints
                            onChange={handleToggle}
                            aria-label='Platform'
                        >
                            <ToggleButton value='senior'>Senior</ToggleButton>
                            <ToggleButton value='nurse'>Nurse</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    {userType === 'senior' && (
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='address'
                                label='Address'
                                id='address'
                                autoComplete='address'
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                    )}
                </Grid>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Register
                </Button>
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Link href='/signin' variant='body2'>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
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

export default Signup;
