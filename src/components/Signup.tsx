import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createUserWithEmailAndPassword } from '../api/auth';

import { createFirebaseDao } from '../api/dao';

function Signup() {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [userType, setUserType] = useState('senior');

	const validateInput = () => {
		if (password.trim() === '' || password.length < 8) return false;
		return true;
	};

	const handleToggle = (
		event: React.MouseEvent<HTMLElement>,
		newUserType: string,
	) => {
		setUserType(newUserType);
	};

	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		if (validateInput()) {
			createUserWithEmailAndPassword(email, password)
				.then((registeredUser) => {
					if (userType === 'nurse') {
						const user = createFirebaseDao('nurse');
						user.add({
							uid: registeredUser.user.uid,
							firstName,
							lastName,
							email,
							address,
							userType,
						});
					} else {
						const user = createFirebaseDao('senior');
						user.add({
							uid: registeredUser.user.uid,
							firstName,
							lastName,
							email,
							address,
							userType,
						});
					}
					navigate('/');
				})
				.catch((err) => {});
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Typography component='h1' variant='h5' sx={{ mt: '6rem' }}>
				Sign up
			</Typography>
			<Box
				component='form'
				noValidate
				onSubmit={handleSubmit}
				sx={{ mt: 3 }}
			>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete='given-name'
							name='firstName'
							required
							fullWidth
							id='firstName'
							label='First Name'
							autoFocus
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							fullWidth
							id='lastName'
							label='Last Name'
							name='lastName'
							autoComplete='family-name'
							onChange={(e) => setLastName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='new-password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<ToggleButtonGroup
							color='primary'
							value={userType}
							exclusive
							onChange={handleToggle}
							aria-label='Platform'
						>
							<ToggleButton value='senior'>Senior</ToggleButton>
							<ToggleButton value='nurse'>Nurse</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
					{userType === 'senior' && (
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name='address'
								label='Address'
								id='address'
								autoComplete='address'
								onChange={(e) => setAddress(e.target.value)}
							/>
						</Grid>
					)}
				</Grid>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					sx={{ mt: 3, mb: 2 }}
				>
					Register
				</Button>
				<Grid container justifyContent='center'>
					<Grid item>
						<Link href='/signin' variant='body2'>
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default Signup;
