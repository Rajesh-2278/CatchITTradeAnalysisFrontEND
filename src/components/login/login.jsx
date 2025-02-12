import React, { useState, useContext, useEffect } from 'react';
import { InvestorContext } from '../../contexts/InvestorProvider';  
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [investorId, setInvestorId] = useState('');
  const [investorUsername, setInvestorUsername] = useState('');
  const { setInvestorDetails, investorDetails } = useContext(InvestorContext);

  const navigate = useNavigate(); 

  const handleLogin = () => {

    if (investorId && investorUsername) {
      setInvestorDetails({ userId: investorId, username: investorUsername });  
      console.log("InvestorId: " + investorId + " InvestorUsername: " + investorUsername);
      console.log("InvestorDetails: " + investorDetails.userId + " " + investorDetails.username);
      navigate("/");  
    } else {
      alert("Please enter both Investor userId and username!");
    }
  }

  useEffect(() => {
    console.log("InvestorDetails updated: ", investorDetails.userId, investorDetails.username);
  }, [investorDetails]);

  return (
    
    <div>
      <center>
      <h2>Login</h2>
      <input 
        type="number" 
        value={investorId} 
        onChange={(e) => setInvestorId(e.target.value)}  
        placeholder="Enter your userId" 
      /><br />
      <input 
        type="text" 
        value={investorUsername} 
        onChange={(e) => setInvestorUsername(e.target.value)}  
        placeholder="Enter your username" 
      /> <br />
      <button onClick={handleLogin}>Login</button>
      </center>
    </div>
  );
};

export default Login;
