import React, { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <Fragment>
    <div> <Link to={'/investors'}>Investors</Link>|| <Link to={'/companies'}>Compaies</Link></div>
    <Outlet />
    </Fragment>
  )
}

export default Navbar