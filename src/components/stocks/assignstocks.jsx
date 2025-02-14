import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { InvestorContext } from '../../contexts/InvestorProvider'; 

const Assignstocks = ({md}) => {
  // const [companyId, setCompanyId] = useState('');
  //const [investorId, setInvestorId] = useState('');
  const [stocksToAssign, setStocksToAssign] = useState('');
  const [message, setMessage] = useState('');

  const navigate=useNavigate()

  const { investorDetails } = useContext(InvestorContext);
  

  const assignStocks = () => {
    console.log(md)
    axios.post(`${process.env.REACT_APP_API_URL}/company/assignStocks`, null, {
      params: {
        companyId: md,
        investorId: investorDetails.userId,
        stocksToAssign: stocksToAssign
      }
    })
    .catch((error) => {
      console.error("There was an error assigning stocks!", error);
      setMessage("Error assigning stocks!");
    });

    navigate("/")
  };

  return (
    <div>
      
    
      <div>
        <div>
        <input
          type="number"
          value={stocksToAssign}
          onChange={(e) => setStocksToAssign(e.target.value)}
        />
      </div>
      <button onClick={assignStocks}>Assign Stocks</button>
      </div>
      {message && <p>{message}</p>}
      
    </div>
  );
};

export default Assignstocks;
