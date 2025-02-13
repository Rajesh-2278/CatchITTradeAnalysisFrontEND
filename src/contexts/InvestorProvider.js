import React, { createContext, useState } from 'react';

export const InvestorContext = createContext();//{ investorDetails: { userId: '', username: '' }, setInvestorDetails: ()=>{} });  // the context

export const InvestorProvider = ({ children }) => {
  const [ investorDetails, setInvestorDetails ] = useState({ userId: '', username: ''}); //State to store investor details

  return (
    <InvestorContext.Provider value={{ investorDetails, setInvestorDetails }}>
      {children}
    </InvestorContext.Provider>
  );
};