import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvestorContext } from '../../contexts/InvestorProvider';

const Assignstocks = ({ md, stockPrice }) => {
  const [stocksToAssign, setStocksToAssign] = useState('');
  const [message, setMessage] = useState('');
  const [investors, setInvestors] = useState(null); // Initially null
  const navigate = useNavigate();

  const { investorDetails } = useContext(InvestorContext);

  const assignStocks = () => {
    if (!investors) {
      console.error("Investors data is not loaded yet.");
      return; // Exit early if investors data is not available
    }

    console.log("Investor data:", investors);
    console.log("Investor KYC Status:", investors.kycStatus);

    // Check if KYC status is verified or pending
    if (investors.kycStatus === 'VERIFIED') {
      console.log("KYC is approved. Proceeding further...");
    } else if (investors.kycStatus === 'PENDING') {
      alert("KYC status is pending. Please complete your KYC.");
      return; // Prevent further execution if KYC status is pending
    }
    if (investors.myFunds >= stocksToAssign * stockPrice) {
      console.log("Sufficent funds u have");
    } else {
      alert("No Fund available");
      return; // Prevent further execution if KYC status is pending
    }
    console.log(investorDetails.userId);
    console.log("Assigning stocks...");

    // Assign stocks request
    axios.post(`${process.env.REACT_APP_API_URL}/company/assignStocks`, null, {
      params: {
        companyId: md,
        investorId: investorDetails.userId,
        stocksToAssign: stocksToAssign,
      },
    })
      .then((response) => {
        console.log("Stocks assigned successfully:", response.data);
        navigate("/investors"); // Navigate after success
      })
      .catch((error) => {
        console.error("There was an error assigning stocks!", error);
        setMessage("Error assigning stocks!");
      });
  };

  useEffect(() => {
  if (investorDetails.userId) {
    axios.get(`${process.env.REACT_APP_API_URL}/investor/getInvestorById/` + investorDetails.userId)
      .then((res) => {
        console.log("Investor details:", res.data);
        setInvestors(res.data); // Update investors state with the latest details
      })
      .catch((error) => {
        console.error("Error fetching investor data:", error);
      });
  }
}, [investorDetails.userId]); // Fetch investor details whenever the userId changes
 // Ensure this effect re-runs if userId changes

  // Render loading state if investors data is not available yet
  // if (investors === null) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div>
        <input
          type="number"
          value={stocksToAssign}
          onChange={(e) => setStocksToAssign(e.target.value)}
        />
        Money Required: ₹{stocksToAssign * stockPrice}
      </div>

      <button className='assignstocks-button' onClick={assignStocks}>Assign Stocks</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Assignstocks;
