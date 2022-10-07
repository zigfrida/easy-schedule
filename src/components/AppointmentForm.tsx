import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box, { BoxProps } from '@mui/material/Box';
import dayjs, { Dayjs } from 'dayjs';

function AppointmentForm() {
    const [nurse, setNurse] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState<Dayjs | null>(dayjs());

    const dateHandler = (newValue: Dayjs | null) => {
        setDate(newValue);
    };

    const handleSubmit: BoxProps['onSubmit'] = (event) => {
        event.preventDefault();
    };

    return (
        <Container component='main' maxWidth='md'>
            <Typography component='h1' variant='h5'>
                Schedule New Appointment
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete='given-name'
                            name='nurse'
                            required
                            fullWidth
                            id='nurse'
                            label='Nurse'
                            autoFocus
                            value={nurse}
                            onChange={(e) => setNurse(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id='title'
                            label='Title'
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name='location'
                            label='Location'
                            id='location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label='Date&Time picker'
                                value={date}
                                onChange={dateHandler}
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Schedule
                </Button>
            </Box>
        </Container>
    );
}

export default AppointmentForm;
