import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserProvider';

const Investor = () => {
  const [data, setData] = useState([]);
  const { userDetails } = useContext(UserContext);  // Access userDetails from context
  
  useEffect(() => {
    
    if (userDetails && userDetails.userId) {
      axios.get(`http://localhost:9091/investor/getCompaniesByInvestorId/${userDetails.userId}`)
        .then((resp) => setData(resp.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [userDetails.userId]); 

  return (
    <div className='course-list-container'>
      {
        data.map((e) => (
          <div className='course-box' key={e.id}>
            <h1>{e.name}</h1>
            <h1>{e.stockCount}</h1>
          </div>
        ))
      }
    </div>
  )
}

export default Investor;
