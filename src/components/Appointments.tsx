import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AppointmentForm from './AppointmentForm';
import Menubar from './Menubar';

import useAuthData from '../hooks/useAuthData';
import useAppointments from '../hooks/useAppointments';

function Appointments() {
    const { user } = useAuthData();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const appointmentFilter = useMemo(
        () => (user?.userType === 'nurse' ? { nurse: user?.uid } : { senior: user?.uid }),
        [user?.userType, user?.uid],
    );

    const [appointments] = useAppointments({
        /* Do not fetch appointments data if user data is not available */
        active: Boolean(user),
        filter: appointmentFilter,
    });

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
                    {user?.userType === 'senior' && (
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
                    )}
                </Stack>

                <Box alignItems='center'>
                    {appointments?.map((item) => (
                        <Card
                            sx={{ maxWidth: 345, mb: 2 }}
                            onClick={() => navigate(`/appointment/${item.uid}`)}
                        >
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    {item.title}
                                </Typography>
                                <Typography variant='subtitle1' color='text.secondary'>
                                    <AccessTimeIcon />
                                    {item.date}
                                </Typography>
                                <Typography variant='body1' color='text.secondary'>
                                    <LocationOnIcon />
                                    {item.location}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size='small'
                                    onClick={() => navigate(`/appointment/${item.uid}`)}
                                >
                                    View Appointment
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Container>
        </div>
    );
}

export default Appointments;
