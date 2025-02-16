import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { InvestorContext } from '../../contexts/InvestorProvider';

const Investor = () => {
  const [data, setData] = useState([]);
  const { investorDetails } = useContext(InvestorContext);  // Access userDetails from context
  
  useEffect(() => {
    
    if (investorDetails && investorDetails.userId) {
      axios.get(`${process.env.REACT_APP_API_URL}/investor/getCompaniesByInvestorId/${investorDetails.userId}`)
        .then((resp) => setData(resp.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [investorDetails.userId]); 

  return (
    <div className='course-list-container'>
      {
        data.map((e) => (
          <div className='course-box' key={e.id}>
              <h2 style={{ color: 'green' }}> {e.name}</h2>
              <h3 style={{ color: 'green' }}> Invested- {e.stockCount} </h3>
          </div>
        ))
      }
    </div>
  )
}

export default Investor;
