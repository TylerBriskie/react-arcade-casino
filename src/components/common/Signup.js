import React, {Component} from 'react';
import {TextField, Button} from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// LOCAL FILES
import "./Signup.css";

const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is Required'),
    display_name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(24, '24 Characters max!')
      .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(24, '24 characters maximum.')
        .required('Please Enter your password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must contain 8 characters at least one number, and one special case character"
          ),
    confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
  });


const Signup = () => {








        return ( 
            <div>
                <h2 className="page-section-header">SIGN UP</h2>
                <h4  className="page-section-header" >(We will never share your email address with anyone)</h4>
                <Formik
                    initialValues={{            
                        email: '',
                        display_name: '',
                        password: '',
                        confirm_password: ''
                    }} 
                    validationSchema={SignupSchema}

                    onSubmit={(data, {setSubmitting }) => {
                        setSubmitting(true);

                        // make async call
                        setTimeout(() => {
                            setSubmitting(false);
                            alert('form submitted')
                        }, 1000)

                        console.log(data)
                    }}   
                        >
                    {({ values, isSubmitting, handleChange, handleBlur, handleSubmit, isValid, errors, touched, dirty }) => (
                        
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
                            <div>
                          
                            </div>

                     

                            <div>
                                <Button disabled={isSubmitting || !isValid || !dirty } type="submit">Submit</Button>

                            </div>

                        </Form>
                    )}
                </Formik>

            </div>
         );

}
 
export default Signup;