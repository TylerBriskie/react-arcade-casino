
import React, {useContext} from 'react';
import {TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'


import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// LOCAL IMPORTS
import { AuthContext } from '../../contexts/authContext';

import './Login.css';


var jwt_decode = require('jwt-decode');

const Login = () => {
    let history = useHistory();
    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email address')
          .required('Please enter your email'),

        password: Yup.string()
            .min(8, "Must contain 8 characters at least one number, and one special case character")
            .max(24, '24 characters maximum.')
            .required('Please Enter your password')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must contain 8 characters at least one number, and one special case character"
              ),

    });
    

    let formErrorMessage = null;
    
    return ( 
        <div className="page-container">
            <h2 className="page-section-header">LOGIN</h2>            
            <Formik
                initialValues={{            
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}

                onSubmit={(data, {setSubmitting, setErrors}) => {
                    setSubmitting(true);

                    const postData = data;

                    axios.post(process.env.REACT_APP_API_BASE_URL+'auth/login', postData)
                    .then(function (response) {
                        // LOGIN SUCCESS
                        setSubmitting(false);

                        var decoded = jwt_decode(response.data);
                        console.log(decoded);

                        setAuthenticated({
                            isAuthenticated: true,
                            token: response.data,
                            id: decoded.user_id,
                            username: decoded.username,
                            credits: decoded.credits
                        });

                        history.push('/account');
                       
                        
                    })
                    .catch(function (error) {
                        if (error){}

                        // if(error.response && error.response.status === 409){
                        //     currentComponent.setState({
                        //         error: {
                        //             hasError: true, message: error.response.data
                        //         }

                        //     })
                           formErrorMessage = "There was an error logging in.  Check your credentials and try again."
                        // }
                        console.log(formErrorMessage, error);
                        
                        setSubmitting(false);
                    });
                }}
            >
                {({ values, isSubmitting, handleChange, handleBlur, handleSubmit, isValid, errors, touched, dirty, handleReset }) => (
                    <Form id="login-form" >
                        <div className="form-input">
                        <Field 
                            placeholder="Email"
                            className="login-form-input"
                            name="email" 
                            type="input" 
                            error={errors.email && touched.email}
                        
                            as={TextField}
                        />
                        {
                            errors.email && touched.email ? 
                            <div className="error-message">{errors.email}</div> : 
                            <div  className="error-message"></div>
                        }
                        </div>
                        <div className="form-input">
                            <Field 
                                className="login-form-input"
                                placeholder="Password"
                                name="password" 
                                type="password"
                                error={errors.password && touched.password}

                                as={TextField}
                            />
                            {
                                errors.password && touched.password ? 
                                <div className="error-message">{errors.password}</div> : 
                                <div  className="error-message"></div>
                            }
                        </div>
                        <div className="form-buttons-group">
                            <Button variant="contained" className="welschman" disabled={!dirty } type="reset">Clear</Button>

                            <Button variant="contained" color="primary" disabled={isSubmitting || !isValid || !dirty } type="submit">Submit</Button>

                        </div>

                        <div className="login-error-container">
                            {formErrorMessage === null ? 
                                <div></div> 
                                :
                                (<div>
                                    <p className="login-error-message">{formErrorMessage}</p>
                                    
                                    <Button variant="contained" className="margin-top" onClick={() => {console.log('resetting password')}}>
                                        Reset Password
                                    </Button>
                                    
                                </div>
                                )
                            }

                        </div>
                    </Form>
                )}
                
            </Formik>

        </div>
     );
}
 
export default Login;