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
        <div class-name="myprofile">
            <h1>My Profile</h1>
            <div className="profile">
                <p><strong>First Name:</strong> {investorDetails.firstName}</p>
                <p><strong>Last Name:</strong> {investorDetails.lastName}</p>
                <p><strong>Email:</strong> {investorDetails.email}</p>
                <p><strong>Phone Number:</strong> {investorDetails.phoneNumber}</p>
                <p><strong>Address:</strong> {investorDetails.address}</p>
            </div>
        </div>
    );
}

export default MyProfile;