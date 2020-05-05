import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

import {TextField, Button, Box} from '@material-ui/core';


import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// LOCAL FILES
import { ThemeContext } from '../../contexts/themeContext';
import { AuthContext } from '../../contexts/authContext';
import "./Signup.css";


const axios = require('axios');


const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email'),
    display_name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(24, '24 Characters max!')
      .required('Required'),
    password: Yup.string()
        .min(8, "Must contain 8 characters at least one number, and one special case character")
        .max(24, '24 characters maximum.')
        .required('Please Enter your password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must contain 8 characters at least one number, and one special case character"
          ),
    confirm_password: Yup.string()
        .required('Passwords must match')
        .oneOf([Yup.ref("password"), null], "Passwords must match")
  });




class Signup extends Component {

        constructor(props){
            super(props);
            this.state = {
                redirect: null,
                error: {
                    hasError: false, message: ''
                }
            }
        } 

        componentDidMount() {
            // const user = this.context
            if (this.context.isAuthenticated){
                this.setState({redirect: '/account'})
            }
            // console.log(user) // { name: 'Tania', loggedIn: true }
        }

        // RENDER FUNCTION ***************************************************************************
        render(){
            if (this.state.redirect){
                return <Redirect to={this.state.redirect} />
            }
            return (
                <AuthContext.Consumer>
                {(authContext) => (
                    <ThemeContext.Consumer> 
                        {(themeContext) => {

                            const { setAuthenticated } = authContext;


                            return(
                                <div className="page-container">
                                <h2 className="page-section-header">SIGN UP</h2>
                                <h4  className="page-section-header" >(We will never share your email address with anyone)</h4>
                                {/*
                                
                                FORMIK WRAPPER W/ SETUP
            
                                */ }                    
                                <Formik
                                    initialValues={{            
                                        email: '',
                                        display_name: '',
                                        password: '',
                                        confirm_password: ''
                                    }} 
                                    validationSchema={SignupSchema}
                
                                    onSubmit={(data, {setSubmitting, setErrors }) => {
                                        setSubmitting(true);
                
                                        const postData = data;
                                        console.log(postData);
                
                                        let currentComponent = this;
                                        
                                        {/*
                                            POST NEW USER TO SERVER
                                        */ } 
                                        axios.post(process.env.REACT_APP_API_BASE_URL+'auth/signup', postData)
                                          .then(function (response) {
                                            setSubmitting(false);

                                            console.log('user created - ', response);
                                            setAuthenticated({
                                                isAuthenticated: true,
                                                // token
                                            });

                                            currentComponent.setState({
                                                redirect: '/settings'
                                            })
                                            
                                          })
                                          .catch(function (error) {
                                            console.log( error);
                                            if(error.response && error.response.status === 409){
                                                currentComponent.setState({
                                                    error: {
                                                        hasError: true, message: error.response.data
                                                    }
                
                                                })
                                                setErrors({
                                                    email: "a user with that email exists"
                                                })
                                            }
                                     
                                            
                                            setSubmitting(false);
                                          });
                
                
                                        console.log(data)
                                    }}   
                                        >
                                    {({ values, isSubmitting, handleChange, handleBlur, handleSubmit, isValid, errors, touched, dirty, handleReset }) => (
                                        
                                        <Form id="new-user-form">
                                            <div>
                                                <div>
                                                    <Field 
                                                        placeholder="Email Address"
                                                        className="signup-form-input"
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
                                                <div>
                                                    <Field 
                                                        className="signup-form-input"
                                                        placeholder="Display name"
                                                        name="display_name" 
                                                        type="input"
                                                        error={errors.display_name && touched.display_name}
                                                        as={TextField}
                                                    />
                                                    {
                                                        errors.display_name && touched.display_name ? 
                                                        <div className="error-message">{errors.display_name}</div> : 
                                                        <div  className="error-message"></div>
                                                    }
                
                                                </div>
                                                
                                                <div>
                                                    <Field 
                                                        className="signup-form-input"
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
                                                <div>
                                                    <Field 
                                                        className="signup-form-input"
                                                        placeholder="Confirm Password"
                                                        name="confirm_password" 
                                                        type="password"
                                                        error={errors.confirm_password && touched.confirm_password}
                
                                                        as={TextField}
                                                    />
                                                    {
                                                        errors.confirm_password && touched.confirm_password ? 
                                                        <div className="error-message">{errors.confirm_password}</div> : 
                                                        <div  className="error-message"></div>
                                                    }
                                                </div>
                                                  
                                            </div>
                
                                     
                
                                            <div className="form-buttons-group">
                                                <Button variant="contained" className="form-button" disabled={!dirty } type="reset">Clear</Button>
                
                                                <Button variant="contained" color="primary" disabled={isSubmitting || !isValid || !dirty } type="submit">Submit</Button>
                
                                            </div>
                
                                        </Form>
                                    )}
                                </Formik>
                                
                                    {
                                        this.state.error.hasError === true? 
                                        <Box mt={3}>
                                            <hr />
                                            
                                            <Box mt={3}>
                                            <h3>{this.state.error.message}</h3>
            
                                            </Box>
                                            <div>
                                                <Box mt={3}>
                                                    <Button variant="contained" color={"primary"} >Forgot Password</Button>
            
                                                </Box>
            
                                            </div>
                                        </Box> :
                                        null
                                    }                                        
                                
                            
                            </div>
            
                            )
                        }}
                   </ThemeContext.Consumer>
                )}
            </AuthContext.Consumer> 
        );
    }


}
 
export default Signup;