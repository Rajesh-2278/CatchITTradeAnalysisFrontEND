import React, { createContext, useState } from 'react';

export const InvestorContext = createContext();

export const InvestorProvider = ({ children }) => {
  const [investorDetails, setInvestorDetails] = useState({});

  return (
    <InvestorContext.Provider value={{ investorDetails, setInvestorDetails }}>
      {children}
    </InvestorContext.Provider>
  );
};