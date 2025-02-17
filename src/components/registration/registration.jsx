import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './registration.css';
import { useNavigate } from 'react-router-dom';
import { InvestorContext } from '../../contexts/InvestorProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { setInvestorDetails } = useContext(InvestorContext);
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    kycStatus: 'PENDING',
    accountNumber: '',
    accountType: '',
    address: '',
    panNumber: '',
    myFunds: 0,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    kycStatus: Yup.string().required('KYC Status is required'),
    accountNumber: Yup.string().required('Account Number is required'),
    accountType: Yup.string().required('Account Type is required'),
    address: Yup.string().required('Address is required'),
    panNumber: Yup.string().required('PAN Number is required'),
    myFunds: Yup.number()
      .required('Add Minimum amount 5000')
      .positive('Funds Available must be positive')
      .min(5000, 'Minimum amount should be 5000'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Submitting form data:', values); // Log the request data
    axios.post(`${process.env.REACT_APP_API_URL}/investor/registerInvestor`, values)
      .then(response => {
        console.log('Form data saved successfully:', response.data);
        setInvestorDetails({ userId: response.data.userId, username: response.data.username });
        resetForm();
        toast.success('Successfully registered! Please login.', {
          position: "top-center",
          autoClose: 2000, // Close the toast after 2 seconds
          onClose: () => navigate('/login') // Navigate to login page after toast closes
        });
      })
      .catch(error => {
        console.error('Error saving form data:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        }
        toast.error('Registration failed. Please try again.', {
          position: "top-center"
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-control">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" id="firstName" name="firstName" />
              <ErrorMessage name="firstName" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" id="lastName" name="lastName" />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field type="text" id="phoneNumber" name="phoneNumber" />
              <ErrorMessage name="phoneNumber" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="accountNumber">Account Number</label>
              <Field type="text" id="accountNumber" name="accountNumber" />
              <ErrorMessage name="accountNumber" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="accountType">Account Type</label>
              <Field as="select" id="accountType" name="accountType">
                <option value="">Select Account Type</option>
                <option value="INDIVIDUAL">INDIVIDUAL</option>
                <option value="CORPORATE">CORPORATE</option>
              </Field>
              <ErrorMessage name="accountType" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="panNumber">PAN Number</label>
              <Field type="text" id="panNumber" name="panNumber" />
              <ErrorMessage name="panNumber" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="myFunds">Add Funds to your Account</label>
              <Field type="number" id="myFunds" name="myFunds" />
              <ErrorMessage name="myFunds" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <Field type="text" id="address" name="address" />
              <ErrorMessage name="address" component="div" className="error" />
            </div>

            {/* Disabled KYC Status Field */}
            <div className="form-control">
              <label htmlFor="kycStatus">KYC Status</label>
              <Field type="text" id="kycStatus" name="kycStatus" value="PENDING" disabled />
              <ErrorMessage name="kycStatus" component="div" className="error" />
            </div>

            <button className='submit-button' type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Register;