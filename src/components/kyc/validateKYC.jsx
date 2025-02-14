import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const ValidateKYC = () => {
    const {id} = useParams();
    const [investorDetails, setInvestorDetails] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:9091/investor/getInvestorById/${id}`)
        .then((resp) => setInvestorDetails(resp.data))
        .catch((error) => console.error("Error fetching data:", error));

        console.log(investorDetails);
    },[]);
  return (
    <div>
      <h1>Validating KYC</h1>
      <h2>{id}</h2>
    </div>
  );
};

export default ValidateKYC;