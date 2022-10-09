
import * as React from 'react';
import {Button, TextField } from '@mui/material/';
import './styles.css';


export default function Signin() {
  return (
    <form noValidate autoComplete="off" className='form1'>
      <div className="login"> 
      <h2>Easy Schedule - Nurse Calendar App</h2>
      <h3>Log In</h3>
      <pre><TextField id="filled-basic" label="Email" variant="outlined" /></pre>
    <pre><TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
    </pre>        
        <Button variant="outlined" id='submit' size='medium'>Submit</Button> 
      </div>
    </form>
  );
}

