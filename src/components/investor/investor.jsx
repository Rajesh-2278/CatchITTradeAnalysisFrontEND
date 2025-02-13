import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { InvestorContext } from '../../contexts/InvestorProvider';
import './investor.css';

const Investor = () => {
  const [data, setData] = useState([]);
  const { investorDetails } = useContext(InvestorContext);  // Access investorDetails from context
  
  useEffect(() => {
    
    if (investorDetails && investorDetails.userId) {
      axios.get(`${process.env.REACT_APP_API_URL}/investor/getCompaniesByInvestorId/${investorDetails.userId}`)
        .then((resp) => setData(resp.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [investorDetails.userId]); 

  return (
    <div className='investor-container'>
      {
        data.map((company) => (
          <div className='investor-box' key={company.id}>
              <h2 style={{ color: 'green' }}> {company.name}</h2>
              <h3 style={{ color: 'green' }}> Invested - {company.stockCount} </h3>
          </div>
        ))
      }
    </div>
  )
}

export default Investor;
