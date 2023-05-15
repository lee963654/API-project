import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DemoUser from "../DemoUser/DemoUser";
import UserSpot from "../UserSpot";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (

    <div className="profile-container">
      <button className="profile-button" onClick={openMenu}>
        <i className="fa-sharp fa-solid fa-bars fa-lg"></i> <i className="fas fa-user-circle fa-lg" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div>
            <div className="user-logged-in">Hello, {user.firstName}</div>
            {/* <li>{user.firstName} {user.lastName}</li> */}
            {/* <div className="user-logged-in">{user.email}</div> */}
            <div title={user.email} className="user-logged-in">{user.email.length > 15 ? user.email.slice(0, 15) + "..." : user.email}</div>
            <div className="user-logged-in">
              {/* <NavLink className="profile-link" exact to="/current">Manage Spots</NavLink> */}
              <NavLink onClick={() => {
                closeMenu(); history.push("/current")
              }} className="profile-link" exact to="/current">Manage Spots</NavLink>
            </div>
            <div className="user-logged-in">
              <NavLink onClick={() => {closeMenu(); history.push("/reviews")}} className="profile-link" exact to="/reviews">Manage Reviews</NavLink>
            </div>
            <div className="logout-container">
              <button className="logout-button" onClick={logout}>Log Out</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="no-user-container">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </div>
            <div className="no-user-container no-user-middle">
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
            {/* <div className="no-user-container">
            <OpenModalMenuItem
              itemText="Demo User"
              onItemClick={closeMenu}
              modalComponent={<DemoUser />}
            />
            </div> */}
          </div>
        )}
      </div>
    </div>
    // <>
    //   <button className="profile-button" onClick={openMenu}>
    //     <i className="fa-sharp fa-solid fa-bars fa-lg"></i> <i className="fas fa-user-circle fa-lg" />
    //   </button>
    //   <ul className={ulClassName} ref={ulRef}>
    //     {user ? (
    //       <>
    //         <li>Hello, {user.firstName}</li>
    //         {/* <li>{user.firstName} {user.lastName}</li> */}
    //         <li>{user.email}</li>
    //         <li>
    //           <NavLink exact to="/current">Manage Spots</NavLink>
    //         </li>
    //         <li>
    //           <NavLink exact to="/reviews">Manage Reviews</NavLink>
    //         </li>
    //         <li>
    //           <button onClick={logout}>Log Out</button>
    //         </li>
    //       </>
    //     ) : (
    //       <>
    //         <OpenModalMenuItem
    //           itemText="Log In"
    //           onItemClick={closeMenu}
    //           modalComponent={<LoginFormModal />}
    //         />
    //         <OpenModalMenuItem
    //           itemText="Sign Up"
    //           onItemClick={closeMenu}
    //           modalComponent={<SignupFormModal />}
    //         />
    //         <OpenModalMenuItem
    //           itemText="Demo User"
    //           onItemClick={closeMenu}
    //           modalComponent={<DemoUser />}
    //         />
    //       </>
    //     )}
    //   </ul>
    // </>
  );
}

export default ProfileButton;
