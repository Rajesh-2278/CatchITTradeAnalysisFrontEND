import React, { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { InvestorContext } from '../../contexts/InvestorProvider';
import './navbar.css';

const Navbar = () => {

  const { investorDetails, setInvestorDetails } = useContext(InvestorContext); // Access investorDetails from context
  //const { setInvestorDetails } = useContext(InvestorContext); 
  //const { investorDetails } = useContext(InvestorContext);

  const handleLogout = () => {
    setInvestorDetails({ userId: null, username: null });
  }
  return (
    <Fragment>

      <div className="navbar">
        <div className="nav-links">
          <Link to='/investors' className="nav-link">My Investments</Link>
          <Link to='/history' className="nav-link">My History</Link>
          <Link to='/' className="nav-link">Companies</Link>
        </div>

        {/* {userDetails.userId ? "UserId : "+userDetails.userId : <Link to='/log' className="nav-link">Login</Link>}  */}
        {investorDetails.username ? "Hello  " + investorDetails.username : ''}
        {investorDetails.userId ? <button onClick={handleLogout}>Logout</button> : <Link to='/login' className="nav-link">Login</Link>}
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navbar;
