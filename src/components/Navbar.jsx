import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');  
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path> 
            </svg>
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-post">Create Post</Link></li>
            {/* Show login or logout based on auth state */}
            {currentUser ? (
              <li><button onClick={handleLogout}>Log Out</button></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">Blogit</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create-post">Create Post</Link></li>
          {/* Conditional rendering based on login state */}
          {currentUser ? (
            <li><button onClick={handleLogout}>Log Out</button></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {/* Hide 'Sign up' if the user is logged in */}
        {!currentUser && <Link to="/register" className="btn">Sign up</Link>}
      </div>
    </div>
  );
};

export default Navbar;
