import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Assignstocks from '../stocks/assignstocks';
import PointsChart from '../../PointsChart';
import BarChart from '../../charts/barchart';
import './company.css';

const Company = () => {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");

    const [filteredCompanies, setFilteredCompanies] = useState(companies);

    // Modify the expanded state to track each company individually

    const [expanded, setExpanded] = useState({});
    const [selectedCompanyId, setSelectedCompanyId] = useState(null); // Track selected company

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/company/listAllCompanies`).then(
            (resp) => {
                setCompanies(resp.data);
                console.log(resp.data);
            }
        );
    }, []);

    useEffect(() => {
        const newFilter = companies.filter((company) => {
            return company.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredCompanies(newFilter);
    }, [search, companies]);

    const toggleSection = (companyId, section) => {
        setExpanded(prevState => ({
            ...prevState,
            [companyId]: {
                ...prevState[companyId],
                [section]: !prevState[companyId]?.[section]
            }
        }));
    };

    const handleBuyStocksClick = (companyId) => {
        setSelectedCompanyId(companyId); // Show the "Buy Stocks" form for the clicked company
    };

    return (
        <div>
            <div className="center-search">
                Search Companies: <input 
                    type="search" 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search by company name"
                />
            </div>

            <div className="company-list-container">
                {filteredCompanies.map((company) => (
                    <div className="company-box" key={company.id}>
                        {/* Company Name and Stock Info displayed in the row */}
                       <div className="company-info">
                            <div className="company-details">
                                <h2>{company.name}</h2>
                                <p>Stock Symbol: {company.symbol}</p>
                                <h3>Available Stocks: {company.stockCount}</h3>
                                <p>Stock Price: ₹{company.stockPrice} 100</p>
                            </div>

                            {/* Financials Table on the top right */}
                            <div className="financials">
                                <h4>Financials</h4>
                                <PointsChart value={company.id}/>
                                <BarChart valuee={company.id}/>
                            </div>
                        </div>

                        {/* About Company button and info */}
                        <div>
                            <button onClick={() => toggleSection(company.id, 'about')}>
                                About Company
                            </button>
                            {expanded[company.id]?.about && (
                                <div className="about-company-info">
                                    <h4>About Company</h4>
                                    <p><strong>CEO:</strong> {company.name}</p>
                                    <p><strong>Founded Year:</strong> {company.foundedYear}</p>
                                </div>
                            )}
                        </div>

                        {/* Performance button and info */}
                        <div>
                            <button onClick={() => toggleSection(company.id, 'performance')}>
                                Performance
                            </button>
                            {expanded[company.id]?.performance && (
                                <div className="additional-info">
                                    <h4>Performance</h4>
                                    <p><strong>Profit: </strong> 80% </p>
                                </div>
                            )}
                        </div>

                        {/* Buy Stocks Button */}
                        <div>

                            <button style={{ backgroundColor: '#28a745', color: 'white' }} 
                                    onClick={() => handleBuyStocksClick(company.id)}>
                                Buy 
                           
                            </button>

                            {/* Show Assign Stocks form below if this company is selected */}
                            {selectedCompanyId === company.id && (
                                <div>
                                    <h2 style={{ color: 'red' }}>Enter number of stocks to buy</h2>
                                    <Assignstocks companyId={company.id} />
                                </div>
                            )}
                        </div>

                        {/* Sell Stocks Button */}
                        <div>
                            <button style={{ backgroundColor: '#dc3545', color: 'white' }}>
                                <Link to={`/sellStocks/${company.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                    Sell
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Company;
