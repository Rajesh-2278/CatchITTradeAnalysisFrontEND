import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Company = () => {
    const [companies, setCompanies] = useState([])
    useEffect(() => {
        axios.get("http://localhost:9091/company/listAllCompanies").then(
            (resp) => {
                setCompanies(resp.data);
                console.log(resp.data);
            }
        );
        console.log("rajesh");
        console.log(companies);
        console.log("rajesh");
    }, [])

    return (
        <div className='course-list-container'>
            {
                companies.map(
                    (e) => (
                        <div className='course-box'>
            
                            <h2 style={{ color: 'red' }}> {e.name}</h2>
                            <h3 style={{ color: 'red' }}> Available {e.stockCount} </h3>
                            <button> <Link to={`/assignStocks/${e.id}`}>Buy Stocks</Link></button>
                            
                        </div>
                    )
                )
            }

        </div>
    )
}

export default Company