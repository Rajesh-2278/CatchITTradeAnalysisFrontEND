import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../../contexts/UserProvider';
import "./myprofile.css";
import axios from 'axios'

const MyProfile = () => {
    const [investorDetails, setData] = useState([]);
    const { userDetails } = useContext(UserContext);

    useEffect(() => {
        if (userDetails && userDetails.userId) {
            axios.get(`http://localhost:9091/investor/${userDetails.userId}`)
                .then((resp) => setData(resp.data))
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [userDetails.userId]);



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
                        <td>PAN Card:</td>
                        <td>{investorDetails.panCard}</td>
                    </tr>
                    <tr>
                        <td>Funds Available:</td>
                        <td>{investorDetails.fundsAvailable}</td>
                    </tr>
                    <tr>
                        <td>Invested Amount:</td>
                        <td>{investorDetails.investedAmount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

}

export default MyProfile;