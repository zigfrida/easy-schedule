import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { appointmentDao, userDao } from '../api/collections';
import useAuthData from '../hooks/useAuthData';
import Menubar from './Menubar';
import { Appointment } from '../types';

function Appointmentdetails() {
    const [appointment, setAppointment] = useState<Appointment>();
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState<string | ''>();
    const [updateStatus, setUpdateStatus] = useState(false);

    const { id } = useParams();
    const { user } = useAuthData();

    const handleSubmit: BoxProps['onSubmit'] = (event) => {
        event.preventDefault();
        if (appointment) {
            appointmentDao.update(appointment.uid, {
                ...appointment,
                notes,
            });
            setUpdateStatus(true);
        }
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setUpdateStatus(false);
    };

    const action = (
        <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
            <CloseIcon fontSize='small' />
        </IconButton>
    );

    useEffect(() => {
        async function getData() {
            if (!id) {
                return;
            }

            const appointmentDetails = await appointmentDao.get(id);

            if (!appointmentDetails) {
                return;
            }

            setTitle(appointmentDetails?.title);
            setLocation(appointmentDetails?.location);
            setDate(appointmentDetails?.date);
            setNotes(appointmentDetails?.notes);

            const userId =
                user?.userType === 'nurse' ? appointmentDetails.senior : appointmentDetails.nurse;

            setAppointment(appointmentDetails);

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
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh',
                }}
            >
                <Box
                    component='form'
                    className='login'
                    onSubmit={handleSubmit}
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
                    <TextField
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        multiline
                        rows={4}
                        id='notes'
                        label='Notes'
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        size='medium'
                        style={{
                            maxHeight: '40px',
                            float: 'right',
                            fontSize: '11px',
                            width: '200px',
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Container>
            <Snackbar
                open={updateStatus}
                autoHideDuration={3000}
                onClose={handleClose}
                message='Note Saved!'
                style={{ color: '#509B56' }}
                action={action}
            />
        </>
    );
}
export default Appointmentdetails;
