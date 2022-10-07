import { useState } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AppointmentForm from './AppointmentForm';

function Appointment() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '1px solid #aaaaaa',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <AppointmentForm />
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
                        }}
                    >
                        New Appointment
                    </Button>
                </Stack>
                <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                    <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                        </ListItemAvatar>
                        <ListItemText
                            primary='Brunch this weekend?'
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component='span'
                                        variant='body2'
                                        color='text.primary'
                                    >
                                        Ali Connors
                                    </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                            <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                        </ListItemAvatar>
                        <ListItemText
                            primary='Summer BBQ'
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component='span'
                                        variant='body2'
                                        color='text.primary'
                                    >
                                        to Scott, Alex, Jennifer
                                    </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                        </ListItemAvatar>
                        <ListItemText
                            primary='Oui Oui'
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component='span'
                                        variant='body2'
                                        color='text.primary'
                                    >
                                        Sandra Adams
                                    </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                </>
                            }
                        />
                    </ListItem>
                </List>
            </Container>
        </div>
    );
}

export default Appointment;
