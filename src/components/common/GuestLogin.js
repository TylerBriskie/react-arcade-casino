import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';
import axios from 'axios';
import { useStore } from "../../contexts/store";


// LOCAL IMPORTS
import './GuestLogin.css';

const GuestLogin = (props) => {
    const {state, dispatch} = useStore();


//     const LoginButton = withStyles((theme) => ({
//         root: {
//             color: theme.palette.getContrastText(cyan[900]),
//             width: "200px",
//             backgroundColor: cyan[500],
//             '&:hover': {
//             backgroundColor: cyan[200],
//             color: theme.palette.getContrastText(cyan[200]),

//             },
//         },
//     }))(Button);



    return (
        <div className="page-container" id="guest-login-page">
            <h2>Welcome.  Take a seat.</h2>
            <h4>Please Login if you wish to save your credits or take them to another game.  Or play as a guest</h4>
            <div className="row button-row" >
                <Button variant="contained" color="primary" aria-label="stay" className="guest-login-button" >
                    <Link to="/login" >Login</Link>
                </Button>
                <Button variant="contained" color="primary" aria-label="stay" className="guest-login-button" >
                    <Link to="/signup" >Sign Up</Link>
                </Button>
            </div>
            
            
            <Button aria-label="stay" className="guest-login-button outlined" onClick={
                        dispatch({
                            type: "USER_LOGIN",
                            isAuthenticated: true,
                            token: "GUEST",
                            id: "GUEST",
                            username: "GUEST",
                            credits: 5000
                        })}>
                Continue As Guest
            </Button>

        </div>
)

}

export default GuestLogin;