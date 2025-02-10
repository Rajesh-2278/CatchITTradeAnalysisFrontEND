import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Company = () => {
    const [companies, setCompanies] = useState([])
    const [search, setSearch] = useState("")
    const [filteredCource, setFilteredCource] = useState(companies)


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

    useEffect(() => {
        const newFilter = companies.filter((cour) => {
            return cour.name.toLocaleLowerCase().includes(search);
        });
        setFilteredCource(newFilter);
    }, [search, companies]);
    return (
        <div >
            <center>
            Search Companies : <input type='search' onChange={(e) => setSearch(e.target.value)}></input>
            </center>
            <br />
            <div className='course-list-container'>
                {
                    filteredCource.map(
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
        </div>
    )
}

export default Company