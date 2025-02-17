import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { InvestorContext } from '../../contexts/InvestorProvider';

const Historyy = () => {
  const [data, setData] = useState([]);
  const { investorDetails } = useContext(InvestorContext);  // Access investorDetails from context

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = () => {
      if (investorDetails && investorDetails.userId) {
        axios.get(`${process.env.REACT_APP_API_URL}/investor/getUserHistoryByInvestorId/${investorDetails.userId}`)
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
        data.map((company) => {
          const color = company.color || 'green';  // Default to green if no color is specified in the data
          return (
            <div className='investor-box' key={company.id}>
              <h3 style={{ color: "blue" }}>  {company.companyName} </h3>
              <h3 style={{ color: color }}> Purchased Date and Time - {company.dateTime} </h3>
              <h3 style={{ color: color }}> Stocks- {company.stockCount}</h3>
              <h3 style={{ color: color }}> MoneySpent - {company.moneySpent}</h3>
            </div>
          );
        })
      }
    </div>
  );
}

export default Historyy;
