import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const { isLoading, user, isError, error } = useSelector(state => state.auth)
    const menuItem= <React.Fragment>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        { user?.email ?
          <li><Link to='/login'>Login</Link></li> : 
          <button><Link to='/login'>Logout</Link></button>}
        <li><Link to='/bill'>Bill</Link></li>
    </React.Fragment>
    return (
        <div>
            <div className="navbar bg-secondary text-black">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        {menuItem}
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost normal-case text-xl">Power-Hack</Link>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {menuItem}
    </ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;