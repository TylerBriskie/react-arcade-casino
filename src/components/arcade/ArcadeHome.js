import React, {useContext} from 'react';
import {TextField, Button, Box} from '@material-ui/core';


import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// LOCAL IMPORTS
import { AuthContext } from '../../contexts/authContext';

// import './Login.css';

const ArcadeHome = () => {

    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);


    return ( 
        <div className="page-container">
            <h2 className="page-section-header">Arcade</h2>
            
             <h4>Coming Soon!</h4>
        </div>
     );
}
 
export default ArcadeHome;