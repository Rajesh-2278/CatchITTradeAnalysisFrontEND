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
          ||
          <Link to='/' className="nav-link">Companies</Link>
        </div>
          
          {/* {userDetails.userId ? "UserId : "+userDetails.userId : <Link to='/log' className="nav-link">Login</Link>}  */}
          {userDetails.userId ? " " : <Link to='/log' className="nav-link">Login</Link>} 
          {userDetails.username ? "Hello  "+userDetails.username : ''} 
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
