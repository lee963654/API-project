import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="header-container">
      <div className="header">
        <NavLink exact to="/" className="header-links logo">!AirBnB</NavLink>
      </div>
      <div className="create-and-profile">
        {sessionUser && (
          <div className="header">
            <NavLink exact to="/new" className="header-links create-spot">Create a New Spot</NavLink>
          </div>
        )}
        {isLoaded && (
          <div className="header">
            <ProfileButton user={sessionUser} />
          </div>
        )}

      </div>
    </div>
  );
}

export default Navigation;
