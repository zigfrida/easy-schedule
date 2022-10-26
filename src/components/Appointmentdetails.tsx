import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createFirebaseDao } from '../api/dao';
import useAuthData from '../hooks/useAuthData';

function Appointmentdetails() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [label, setLabel] = useState('');
    const [name, setName] = useState('');

    const { user } = useAuthData();

    async function getData() {
        const diamond = createFirebaseDao('appointment');

        const appointmentUid = 'cd3a73bf-9e26-49d1-b8fc-45598daa1712';
        const userD = await diamond.get(appointmentUid);

        setTitle(userD?.title);
        setLocation(userD?.location);
        setDate(userD?.date);

        const getSN = createFirebaseDao('user');
        if (user?.userType === 'nurse') {
            setLabel('Senior');
            const seniorName = await getSN.get(userD?.senior);
            const sTotal = seniorName?.firstName.concat(' ', seniorName?.lastName);
            setName(sTotal);
        }
        if (user?.userType === 'senior') {
            setLabel('Nurse');
            const nurseName = await getSN.get(userD?.nurse);
            const nTotal = nurseName?.firstName.concat(' ', nurseName?.lastName);
            setName(nTotal);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
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
    );
}
export default Appointmentdetails;
