import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material/';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Signin() {
    return (
        <form
            noValidate
            autoComplete='off'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
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

                <TextField required id='outlined-required' label='Email' variant='outlined' />

                <TextField
                    required
                    id='outlined-password-input'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    variant='outlined'
                />

                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Submit
                </Button>
            </div>
        </form>
    );
}

export default Signin;
