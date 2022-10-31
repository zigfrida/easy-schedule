import { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box, { BoxProps } from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import { v4 } from 'uuid';

import { appointmentDao } from '../api/collections';
import useAuthData from '../hooks/useAuthData';
import useNursesList from '../hooks/useNursesList';
import { Props } from '../types';

function AppointmentForm({ handleClose }: Props) {
    const { user } = useAuthData();
    const [nurse, setNurse] = useState<string>();
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState<Dayjs | null>(dayjs());

    const [nursesList, loading] = useNursesList();
    const defaultNurse = nursesList[0]?.uid;

    const dateHandler = (newValue: Dayjs | null) => {
        setDate(newValue);
    };

    const nurseHandler = (event: SelectChangeEvent) => {
        setNurse(event.target.value as string);
    };

    const handleSubmit: BoxProps['onSubmit'] = (event) => {
        event.preventDefault();
        const id = v4();
        appointmentDao.add(id, {
            uid: id,
            nurse: nurse || defaultNurse,
            title,
            location,
            // $FIXME: Is `date` ever going to be null?
            date: date?.toString() as string,
            // $FIXME: In theory, a user wouldn't even get to the appointment form
            // if user is null
            senior: user?.uid as string,
        });
        handleClose();
    };

    return (
        <Container component='main' maxWidth='md'>
            <Typography component='h1' variant='h5'>
                Schedule New Appointment
            </Typography>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel id='demo-simple-select-label'>Nurse</InputLabel>
                            <Select
                                required
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={nurse || defaultNurse}
                                label='Nurse'
                                onChange={nurseHandler}
                            >
                                {nursesList?.map((item) => (
                                    <MenuItem key={item.uid} value={item.uid}>
                                        {item.firstName} {item.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
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
            )}
        </Container>
    );
}

export default AppointmentForm;
