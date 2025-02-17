import React, { useState, useContext, useEffect } from 'react';
import { InvestorContext } from '../../contexts/InvestorProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './updateprofile.css';
import { toast, ToastContainer } from 'react-toastify';

const UpdateProfile = () => {
    const { investorDetails, setInvestorDetails } = useContext(InvestorContext);
    const [formData, setFormData] = useState({ ...investorDetails });
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({ ...investorDetails });
    }, [investorDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:9091/investor/${investorDetails.userId}`, formData)
        .then((resp) => {
            setInvestorDetails(resp.data); // Update context with new data
            toast.success('Profile updated successfully!', {
                position: "top-center",
                autoClose: 2000, // Close the toast after 2 seconds
                onClose: () => navigate('/') // Navigate to home page after toast closes
            });
        })
        .catch((error) => console.error("Error updating data:", error));
};

    return (
        <div className="update-profile-container">
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Account Number:</label>
                    <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address || null}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateProfile;