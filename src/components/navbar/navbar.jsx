import React, { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider';

const Navbar = () => {
  const { userDetails } = useContext(UserContext);
  const { setUserDetails } = useContext(UserContext);
  const logoutt = () => {
    setUserDetails({ userId: null, username: null });
  }
  return (
    <Fragment>

      <div className="navbar">
        <div className="nav-links">
          <Link to='/investors' className="nav-link">My Investments</Link>
          ||
          <Link to='/' className="nav-link">Companies</Link>
        </div>

        {/* {userDetails.userId ? "UserId : "+userDetails.userId : <Link to='/log' className="nav-link">Login</Link>}  */}
        {userDetails.userId ? <button onClick={logoutt}>Logout</button> : <Link to='/login' className="nav-link">Login</Link>}
        {userDetails.username ? "Hello  " + userDetails.username : ''}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
