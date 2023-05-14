import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  return (
    <div className="header-container">
      <div className="header">
        <NavLink exact to="/" className="header-links logo"><img src="https://files.prokerala.com/news/photos/imgs/1024/airbnb-logo-653256.jpg" style={{width: 35, height: 35}}></img></NavLink>
        <div onClick={() => history.push("/")} className="airbnb-logo">!AirBnB</div>
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
