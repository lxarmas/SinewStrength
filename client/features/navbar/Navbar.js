import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../app/store';
import AppHeader from '../header/AppHeader';

import './Nav.css';

const Navbar = () => {
   const isLoggedIn = useSelector((state) => !!state.auth.me.id);
   const isAdmin = useSelector((state) => state.auth.me.isAdmin);
   const dispatch = useDispatch();

   const logoutAndRedirectHome = () => {
      dispatch(logout());
   };

   const loggedInLinks = (
      <>
         <NavLink exact={true.toString()} to="/home">Home</NavLink>
         {isAdmin && <NavLink to="/create-user">Create User</NavLink>}
         {isAdmin && <NavLink to="/users">Users</NavLink>}
         <NavLink to="/track-your-progress">Track Your Progress</NavLink>
         <NavLink to="/demonstration-videos">Demonstration Videos</NavLink>
         <NavLink to="/start-your-training">Start Your Training</NavLink>
         <NavLink to="/training-history">Training History</NavLink>
         <NavLink to="/about">About</NavLink>
         <button type="button" onClick={logoutAndRedirectHome}>
            Logout
         </button>
      </>
   );

   const loggedOutLinks = (
      <>
         <NavLink to="/login">Login</NavLink>
         <NavLink to="/signup">Sign Up</NavLink>
         <NavLink to="/track-your-progress">Track Your Progress</NavLink>
         <NavLink to="/start-your-training">Start Your Training</NavLink>
         <NavLink to="/training-history">Training History</NavLink>
         <NavLink to="/about">About</NavLink>
      </>
   );

   return (
      <>
         <AppHeader />
         <div className="navbar">
            <nav className="navbar-nav">
               {isLoggedIn ? loggedInLinks : loggedOutLinks}
            </nav>
         </div>
      </>
   );
};

export default Navbar;