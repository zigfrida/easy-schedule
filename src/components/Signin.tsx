import { Button, TextField, Typography } from '@mui/material/';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../api/auth';

//  import { createFirebaseDao } from '../api/dao';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const [uuid, setUuid] = useState('');

    function handleSignin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential);
                //  const role = 'senior';

                navigate('/menubar', { state: 'senior' });
            })
            .catch(() => {});

        setEmail('');
        setPassword('');
    }

    return (
        <form
            onSubmit={handleSignin}
            noValidate
            autoComplete='off'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
            }}
        >
            <div
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
            </div>
        </form>
    );
}

export default Signin;
