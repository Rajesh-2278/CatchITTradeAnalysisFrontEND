import React, { useEffect, useState, useContext } from "react";
import { InvestorContext } from '../../contexts/InvestorProvider';
import "./myprofile.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyProfile = () => {
    const [investorDetails, setData] = useState({});
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [amountToAdd, setAmountToAdd] = useState('');
    const { investorDetails: contextInvestorDetails } = useContext(InvestorContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("contextInvestorDetails:", contextInvestorDetails); // Log contextInvestorDetails to check if it's defined
        if (contextInvestorDetails && contextInvestorDetails.userId) {
            axios.get(`http://localhost:9091/investor/getInvestorById/${contextInvestorDetails.userId}`)
                .then((resp) => {
                    console.log("API response:", resp.data); // Log the API response
                    setData(resp.data);
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [contextInvestorDetails]); // Re-fetch data when contextInvestorDetails changes

    const handleEditProfile = () => {
        navigate('/updateprofile'); // Navigate to the UpdateProfile component
    };

    const handleAddFunds = () => {
        setShowAddFunds(true);
    };

    const handleAmountChange = (e) => {
        setAmountToAdd(e.target.value);
    };

    const handleAddAmount = () => {
        const payload = { amount: parseInt(amountToAdd) };
        console.log("Request payload:", payload);

        axios.put(`http://localhost:9091/investor/${contextInvestorDetails.userId}/add-funds`, payload)
            .then((resp) => {
                console.log("API response:", resp.data); // Log the API response
                setData(resp.data);
                setShowAddFunds(false);
                setAmountToAdd('');
            })
            .catch((error) => {
                console.error("Error adding funds:", error);
                console.error("Error response:", error.response); // Log the error response
            });
    };

    return (
        <div className="myprofile">
            <h1>My Profile</h1>
            <table className="profile-table">
                <tbody>
                    <tr>
                        <td>First Name:</td>
                        <td>{investorDetails.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>{investorDetails.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{investorDetails.email}</td>
                    </tr>
                    <tr>
                        <td>Phone Number:</td>
                        <td>{investorDetails.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{investorDetails.address}</td>
                    </tr>
                    <tr>
                        <td>KYC Status:</td>
                        <td>{investorDetails.kycStatus}</td>
                    </tr>
                    <tr>
                        <td>Account Number:</td>
                        <td>{investorDetails.accountNumber}</td>
                    </tr>
                    <tr>
                        <td>Account Type:</td>
                        <td>{investorDetails.accountType}</td>
                    </tr>
                    <tr>
                        <td>PAN Number:</td>
                        <td>{investorDetails.panNumber}</td>
                    </tr>
                    <tr>
                        <td>Funds Available:</td>
                        <td>{investorDetails.myFunds}</td>
                    </tr>
                    <tr>
                        <td>Invested Amount:</td>
                        <td>{investorDetails.investedAmount}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleEditProfile}>Edit Profile</button>
            <button onClick={handleAddFunds}>Add Funds</button>
            {showAddFunds && (
                <div className="add-funds">
                    <input
                        type="number"
                        value={amountToAdd}
                        onChange={handleAmountChange}
                        placeholder="Enter amount to add"
                        step="1" // Allows decimal values
                        min="0" // Minimum value is 0
                    />
                    <button onClick={handleAddAmount}>Add</button>
                </div>
            )}
        </div>
    );
}

export default MyProfile;