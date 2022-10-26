import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import AppointmentForm from './AppointmentForm';
import Menubar from './Menubar';

import { createFirebaseDao } from '../api/dao';
import useAuthData from '../hooks/useAuthData';
import { Appointment } from '../types';

function Appointments() {
    const { user } = useAuthData();
    const [open, setOpen] = useState(false);
    const [appointments, setAppointments] = useState<Appointment[] | null>([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (user?.uid) {
            if (user?.userType === 'nurse') {
                createFirebaseDao<Appointment>('appointment')
                    .getAll({ nurse: user?.uid })
                    .then((data) => {
                        const result = data.filter((obj) => {
                            const appointmentDate = dayjs(obj.date);
                            const today = dayjs();
                            return appointmentDate.isAfter(today);
                        });
                        setAppointments(result);
                    });
            } else {
                createFirebaseDao<Appointment>('appointment')
                    .getAll({ senior: user?.uid })
                    .then((data) => {
                        const result = data.filter((obj) => {
                            const appointmentDate = dayjs(obj.date);
                            const today = dayjs();
                            return appointmentDate.isAfter(today);
                        });
                        setAppointments(result);
                    });
            }
        }
    }, [user?.uid]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 550,
        minWidth: 300,
        bgcolor: 'background.paper',
        border: '1px solid #aaaaaa',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Menubar />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <AppointmentForm handleClose={handleClose} />
                </Box>
            </Modal>
            <Container maxWidth='md' style={{ marginTop: '4%' }}>
                <Stack spacing={2} direction='row' style={{ width: '100%', display: 'flex' }}>
                    <Typography variant='h4' gutterBottom style={{ flex: 1 }}>
                        Appointments
                    </Typography>
                    <Button
                        variant='contained'
                        size='small'
                        startIcon={<CalendarMonthIcon />}
                        onClick={handleOpen}
                        style={{
                            maxHeight: '40px',
                            float: 'right',
                            fontSize: '11px',
                        }}
                    >
                        New Appointment
                    </Button>
                </Stack>
                <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                    {appointments?.map((item) => (
                        // <>
                        <ListItem key={item.uid} alignItems='flex-start'>
                            <CalendarMonthIcon />
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <>
                                        <AccountCircleIcon />
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component='span'
                                            variant='body2'
                                            color='text.primary'
                                        >
                                            Nurse: Ali Connors
                                        </Typography>
                                    </>
                                }
                            />
                            <ListItemText
                                primary={
                                    <>
                                        <AccessTimeIcon />
                                        {item.date}
                                    </>
                                }
                                secondary={
                                    <>
                                        <LocationOnIcon />
                                        {item.location}
                                    </>
                                }
                            />
                        </ListItem>
                        //     {/* <Divider key={item.uid + 1} variant='inset' component='li' />
                        // </> */}
                    ))}
                </List>
            </Container>
        </div>
    );
}

export default Appointments;
