import React, { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { InvestorContext } from '../../contexts/InvestorProvider';

const Navbar = () => {
  const { userDetails, setUserDetails } = useContext(InvestorContext);

  const logout = () => {
    setUserDetails({ userId: null, username: null });
  };

  return (
    <Fragment>
      <div className="navbar">
        <div className="nav-links">
          <Link to='/investors' className="nav-link">MyPortfolio</Link>
          ||
          <Link to='/' className="nav-link">Companies</Link>
          {userDetails && userDetails.userId && (
            <>
              ||
              <Link to='/myprofile' className="nav-link">MyProfile</Link>
            </>
          )}
        </div>
        <div className="auth-links">
          {userDetails && userDetails.userId ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to='/login' className="nav-link">Login</Link>
              ||
              <Link to='/register' className="nav-link">Register</Link>
            </>
          )}
          {/* {userDetails && userDetails.username ? "Hello  " + userDetails.username : ''} */}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;