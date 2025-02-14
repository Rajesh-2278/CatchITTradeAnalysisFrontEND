import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { InvestorContext } from '../../contexts/InvestorProvider';
import './investor.css';

const Investor = () => {
  const [data, setData] = useState([]);
  const { investorDetails } = useContext(InvestorContext);  // Access investorDetails from context
  
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = () => {
      if (investorDetails && investorDetails.userId) {
        axios.get(`${process.env.REACT_APP_API_URL}/investor/getCompaniesByInvestorId/${investorDetails.userId}`)
          .then((resp) => setData(resp.data))
          .catch((error) => console.error("Error fetching data:", error));
      }
    };

    // Initial data fetch
    fetchData();

    // Set up polling (e.g., every 5 seconds)
    const intervalId = setInterval(fetchData, 5000);  // Fetch every 5 seconds

    // Clean up polling when the component unmounts or when investorDetails change
    return () => clearInterval(intervalId);

  }, [investorDetails.userId]);

  return (
    <div className='investor-container'>
      {
        data.map((company) => (
          <div className='investor-box' key={company.id}>
              <h2 style={{ color: 'green' }}> {company.name}</h2>
              <h3 style={{ color: 'green' }}> Invested - {company.stockCount} </h3>
              <h3 style={{ color: 'green' }}> totalInvestedMoney - {company.totalInvestedMoney} </h3>
              <h3 style={{ color: 'green' }}> If you sell now - {company.stockPrice}</h3>
          </div>
        ))
      }

    </div>
  )
}

export default Investor;
