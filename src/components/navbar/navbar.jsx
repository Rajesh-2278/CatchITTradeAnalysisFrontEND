import React, { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider'; 

const Navbar = () => {
  const { userDetails } = useContext(UserContext);  

  return (
    <Fragment>
      
      <div className="navbar">
        <div className="nav-links">
          <Link to='/investors' className="nav-link">My Investments</Link>
          <span className="separator">||</span>
          <Link to='/' className="nav-link">Companies</Link>
        </div>
          {userDetails.userId ? "UserId : "+userDetails.userId : 'Not logged in'} 
         | Hello {userDetails.username ? userDetails.username : ''} 
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
