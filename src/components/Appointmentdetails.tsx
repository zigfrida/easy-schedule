import { useEffect } from 'react';
import { useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createFirebaseDao } from '../api/dao';

function Appointmentdetails() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');

    async function getData() {
        const diamond = createFirebaseDao('appointment');

        const userD = await diamond.get('0bbe4031-f433-493f-b6f5-c0dc3fa62da6');
        // const userD = await diamond.get('08a7f3c8-0650-438a-8ca8-f4bef97cfd90');
        console.log(userD);
        console.log(userD.title);
        setTitle(userD.title);
        setLocation(userD.location);
        setDate(userD.date);
        console.log('/////////////////////////////////////////////');

        const nurseType = createFirebaseDao('user');

        // const userD = await diamond.get('6b376fa8-3b42-4e7e-a49f-6260e9d97f1e');
        const nurseName = await nurseType.get(userD.nurse);
        console.log(nurseName);
        setfirstName(nurseName.firstName);
        setlastName(nurseName.lastName);
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
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextField
                    value={location}
                    id='location'
                    label='Location'
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    value={date}
                    id='date'
                    label='Date and Time'
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Box>
                    <TextField
                        value={firstName}
                        id='nurse'
                        label='First Name of Nurse'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        value={lastName}
                        id='nurse'
                        label='Last Name of Nurse'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
}
export default Appointmentdetails;
