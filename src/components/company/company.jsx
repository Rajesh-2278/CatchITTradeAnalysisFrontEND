import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './company.css';

const Company = () => {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState(companies);

    // Modify the expanded state to track each company individually
    const [expanded, setExpanded] = useState({});

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

    // Toggle function to handle the expansion of individual sections by company ID
    const toggleSection = (companyId, section) => {
        setExpanded(prevState => ({
            ...prevState,
            [companyId]: {
                ...prevState[companyId],
                [section]: !prevState[companyId]?.[section]
            }
        }));
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
                        <div>
                            <h2>{company.name}</h2>
                            <p>Stock Symbol: {company.symbol}</p>
                            <h3>Available Stocks: {company.stockCount}</h3>
                            <p>Stock Price: ₹{company.stockPrice} 100</p>
                        </div>
                        
                        {/* About Company button and info */}
                        <div>
                            <button onClick={() => toggleSection(company.id, 'about')}>
                                About Company
                            </button>

                            {/* Show About Company Data only if 'about' is expanded for this company */}
                            {expanded[company.id]?.about && (
                                <div className="about-company-info">
                                    <h4>About Company</h4>
                                    <p><strong>CEO:</strong> {company.ceo}</p>
                                    <p><strong>Founded Year:</strong> {company.foundedYear}</p>
                                </div>
                            )}
                        </div>

                        {/* Performance button and info */}
                        <div>
                            <button onClick={() => toggleSection(company.id, 'performance')}>
                                Performance
                            </button>

                            {/* Conditionally render Performance info below About Company */}
                            {expanded[company.id]?.performance && (
                                <div className="additional-info">
                                    <h4>Performance</h4>
                                    <p><strong>Profit: </strong> 80% </p> {/* Example profit */}
                                </div>
                            )}
                        </div>

                        {/* Buy and Sell Stocks Buttons with custom colors */}
                        <div>
                            {/* Buy Stocks Button - Green */}
                            <button style={{ backgroundColor: '#28a745', color: 'white' }}>
                                <Link to={`/assignStocks/${company.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                    Buy
                                </Link>
                            </button>

                            {/* Sell Stocks Button - Red */}
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
