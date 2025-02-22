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
        
        {/* {userDetails.userId ? "UserId : "+userDetails.userId : <Link to='/log' className="nav-link">Login</Link>}  */}
        <div className="nav-links">
          <Link to='/' className="nav-link">Companies</Link>
        </div>
        <div className='nav-links-user'>
          {investorDetails.userId ? <Link to='/history' className="nav-link">My History</Link> : ""}
          {investorDetails.userId ? <Link to='/investors' className="nav-link">My Investments</Link> : ""}
          {investorDetails.username ? <Link to='/myprofile' className="nav-link">Hello {investorDetails.username}</Link> : ""}
          {investorDetails.userId ? <button className='logout-button' onClick={handleLogout}>Logout</button> : <Link to='/login' className="nav-link">Login</Link>}
          
          {investorDetails.userId ? "" : <Link to='/registration' className="nav-link">Register</Link>}
        </div>
        {/* {investorDetails.userId ? <Link to='/history' className="nav-link">My History</Link> : ""} */}
        {/* {investorDetails.userId ? <Link to='/investors' className="nav-link">My Investments</Link> : ""} */}
        {/* {investorDetails.username ? <Link to='/myprofile' className="nav-link">Hello {investorDetails.username}</Link> : ""} */}
        {/* {investorDetails.username ? <div className="greetings">Hello {investorDetails.username}</div> : ""} */}
        {/* {investorDetails.userId ? <button className='logout-button' onClick={handleLogout}>Logout</button> : <Link to='/login' className="nav-link">Login</Link>} */}
       
        {/* {investorDetails.userId ? "" : <Link to='/registration' className="nav-link">Register</Link>} */}
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navbar;
