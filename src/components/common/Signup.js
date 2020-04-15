import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import "./Signup.css";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));



const Signup = () => {
    const classes = useStyles();


    return ( 
        <div>
            <h2>SIGNUP</h2>

            <form className={classes.root + " new-user-form"} noValidate autoComplete="off">

                <TextField
                    
                    id="email-input"
                    label="Email Address"
                    helperText="Invalid Email"
                />
                 <TextField
                    id="display-name-input"
                    label="Display Name"
                    helperText="Display Name."
                />
                 <TextField
                    
                    id="password-input"
                    label="Password"
                />
                 <TextField
                    
                    id="confirm-password-input"
                    label="Confirm Password"
                />

            </form>
        </div>
     );
}
 
export default Signup;