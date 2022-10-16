import { Button, TextField } from '@mui/material/';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../api/auth';
import { createFirebaseDao } from '../api/dao';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function handleSignin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('Email 👉️', email);
        console.log('password 👉️', password);
        signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const { user } = userCredential;

                console.log(user);
                console.log(user.uid);
                const uu = JSON.stringify(user);
                console.log(uu);
                const userdao = createFirebaseDao('userType');
                userdao
                    .get(user.uid)
                    .then((doc) => {
                        console.log('Document data:', doc);
                        console.log(JSON.stringify(doc));
                        const role = 'senior';
                        navigate('/menubar', { state: role });
                    })
                    .catch((e) => {
                        console.log(e.message);
                    });
            })
            .catch(() => {});

        setEmail('');
        setPassword('');
    }

    return (
        <body>
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
        </body>
    );
}

export default Signin;
