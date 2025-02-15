import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const KycStatuss = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9091/investor/getPendingKycInvestors").then(
            resp => setData(resp.data)
        )
        console.log("hero")
        console.log(data)
    }, [])
    
    const approve = (e) => {
        const updatedInvestor = {
          kycStatus: 'VERIFIED' 
        };
      
        axios.put(`http://localhost:9091/investor/${e}`, updatedInvestor)
          .then((response) => {
            console.log("Investor updated:", response.data);
          })
          .catch((error) => {
            console.error("There was an error updating the investor:", error);
          });
      };
      
    return (
        <div className='mainn'>
           
            {/* 
            <Link to={'/addemploy'}>AddEmployee</Link> */}
            <table class="table table-success table-striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>sal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                            .map(
                                (e) => (<tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.salary}</td>
                                    <td>  <button onClick={()=>{approve(e.id)}}>Approve</button> </td>
                                </tr>
                                ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default KycStatuss