import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { InvestorContext } from '../../contexts/InvestorProvider';
import Assignstocks from '../stocks/assignstocks';
import PointsChart from '../../PointsChart';
import BarChart from '../../charts/barchart';
import './company.css';
import { CompanyDescription } from './companyDescription';



const Company = () => {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const { investorDetails } = useContext(InvestorContext); 
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
        if (investorDetails && investorDetails.userId) {
            console.log("KYC is approved. Proceeding further...");
            setSelectedCompanyId(companyId); // Show the "Buy Stocks" form for the clicked company
          } else  {
            alert("Please login before purchasing...");
            return; // Prevent further execution if KYC status is pending
          }
        
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
                                <p>Stock Symbol: {company.tickerSymbol}</p>
                                <h3>Available Stocks: {company.stockCount}</h3>
                                <p>Stock Price: ₹{company.stockPrice} </p>
                            </div>

                            {/* Financials Table on the top right */}
                            <div className="financials">
                                <h4>Statistics</h4>
                                <PointsChart value={company.id} />
                                <BarChart valuee={company.id} />
                            </div>
                        </div>

                        {/* About Company button and info */}
                        <div>
                            <button className='company-page-button' onClick={() => toggleSection(company.id, 'about')}>
                                About Company
                            </button>
                            {expanded[company.id]?.about && (
                                <div className="about-company-info">

                                    <p><strong>sector :</strong> {company.sector}</p>
                                    <p><strong>address :</strong> {company.address}</p>
                                    <p><strong>country :</strong> {company.country}</p>
                                    <p><strong>OfficialSite :</strong><a href={company.officialSite} target="_blank" >{company.officialSite}</a></p>
                                    {/* <p><strong>description :</strong> {company.description}</p> */}
                                    <div>
                                        <CompanyDescription description={company.description} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Performance button and info ////*/}
                        <div>
                            <button className='company-page-button' onClick={() => toggleSection(company.id, 'performance')}>
                                Performance
                            </button>
                            {expanded[company.id]?.performance && (
                                <div className="additional-info">
                                    <p><strong>quarterlyRevenueGrowthYOY: </strong> {company.quarterlyRevenueGrowthYOY} </p>
                                    <p><strong>quarterlyEarningsGrowthYOY: </strong> {company.country} </p>
                                    <p><strong>200DayMovingAverage: </strong> {company.day200MovingAverage} </p>
                                    <p><strong>50DayMovingAverage: </strong> {company.day50MovingAverage} </p>
                                </div>
                            )}
                        </div>

                        {/* Buy Stocks Button */}
                        <div>

                            <button className='company-page-button' style={{ backgroundColor: '#28a745', color: 'white' }}
                                onClick={() => handleBuyStocksClick(company.id)}>
                                Buy

                            </button>

                            {/* Show Assign Stocks form below if this company is selected */}
                            {selectedCompanyId === company.id && (
                                <div>
                                    <Assignstocks md={company.id} stockPrice={company.stockPrice} />
                                </div>

                            )}
                        </div>

                        {/* Sell Stocks Button */}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Company;