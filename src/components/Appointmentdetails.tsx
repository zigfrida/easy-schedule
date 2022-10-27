import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { appointmentDao, userDao } from '../api/collections';
import useAuthData from '../hooks/useAuthData';
import Menubar from './Menubar';

function Appointmentdetails() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState('');

    const { id } = useParams();
    const { user } = useAuthData();

    useEffect(() => {
        async function getData() {
            if (!id) {
                return;
            }

            const appointment = await appointmentDao.get(id);

            if (!appointment) {
                return;
            }

            setTitle(appointment?.title);
            setLocation(appointment?.location);
            setDate(appointment?.date);

            const userId = user?.userType === 'nurse' ? appointment.senior : appointment.nurse;

            const userData = await userDao.get(userId);
            const userName = userData?.firstName.concat(' ', userData?.lastName);

            if (userName) {
                setName(userName);
            }
        }
        getData();
    }, []);

    const label = user?.userType === 'nurse' ? 'Senior' : 'Nurse';

    return (
        <>
            <Menubar />
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
                    className='login'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        rowGap: '20px',
                    }}
                >
                    <Typography component='h1' variant='h5' style={{ alignSelf: 'center' }}>
                        Appointment Details
                    </Typography>

                    <TextField
                        value={title}
                        id='title'
                        label='Title'
                        variant='filled'
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <TextField
                        value={location}
                        id='location'
                        label='Location'
                        variant='filled'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        value={date}
                        id='date'
                        label='Date'
                        variant='filled'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        value={name}
                        id='service'
                        label={label}
                        variant='filled'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            </Container>
        </>
    );
}
export default Appointmentdetails;
