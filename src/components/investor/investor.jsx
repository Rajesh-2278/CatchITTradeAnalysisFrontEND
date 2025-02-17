import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { InvestorContext } from '../../contexts/InvestorProvider';
import './investor.css';

const Investor = () => {
  const [data, setData] = useState([]);
  const [showSellForm, setShowSellForm] = useState(null); // State to track which company's sell form to show
  const [stocksToAssign, setStocksToAssign] = useState('');
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

  const handleSellClick = (companyId) => {
    setShowSellForm(companyId);  // Show the sell form for the selected company
  };

  const handleAssignStocks = (companyId) => {
    axios.post(`${process.env.REACT_APP_API_URL}/company/sellStocks`, null, {
      params: {
        companyId,
        investorId: investorDetails.userId,
        stocksToAssign,
      },
    })
      .then(() => {
        setStocksToAssign(''); // Clear the input after successful request
        setShowSellForm(null); // Hide the sell form after submitting
      })
      .catch((error) => {
        console.error("There was an error assigning stocks!", error);
      });
  };

  return (
    <div className='investor-container'>
      {
        data.map((company) => (
          <div className='investor-box' key={company.id}>
             
            <h2 style={{ color: 'green' }}> {company.name}</h2>
            <h3 style={{ color: 'green' }}> Invested - {company.stockCount} </h3>
            {/* <h3 style={{ color: 'green' }}> Total Invested Money - {company.totalInvestedMoney} </h3> */}
            <h3 style={{ color: 'green' }}> Last Stock Bought price - ₹{company.stockPrice}</h3>

            <div>
              <button 
                style={{ backgroundColor: '#dc3545', color: 'white' }} 
                onClick={() => handleSellClick(company.id)}
              >
                Sell
              </button>
            </div>

            {/* Show sell form if this company is selected */}
            {showSellForm === company.id && (
              <div>
                <input
                  type="number"
                  value={stocksToAssign}
                  onChange={(e) => setStocksToAssign(e.target.value)}
                  placeholder="Enter number of stocks"
                />
                <button onClick={() => handleAssignStocks(company.id)}>
                  Confirm Sell
                </button>
              </div>
            )}
          </div>
        ))
      }
    </div>
  )
}

export default Investor;
