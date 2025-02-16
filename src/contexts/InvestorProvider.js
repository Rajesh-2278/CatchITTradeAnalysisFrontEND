import React, { createContext, useState } from 'react';

export const InvestorContext = createContext();//{ investorDetails: { userId: '', username: '' }, setInvestorDetails: ()=>{} });  // the context

export const InvestorProvider = ({ children }) => {
  const [ investorDetails, setInvestorDetails ] = useState({ userId: '', username: ''}); //State to store investor details

  const login = (user) => {
    setInvestorDetails(user);
};

  return (
    <InvestorContext.Provider value={{ investorDetails, setInvestorDetails, login }}>
      {children}
    </InvestorContext.Provider>
  );
};