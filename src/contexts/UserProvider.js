import React, { createContext, useState } from 'react';

export const UserContext = createContext();  //  the context

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({ userId: null, username: null });  // State to store user details

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
