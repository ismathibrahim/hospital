import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

import "./SideNav.scss";

const SideNav = () => {
  let match = useRouteMatch();

  return (
    <div className="side-nav">
      <div className="logo">Hospital</div>
      <div className="nav-links">
        <NavLink exact to={`${match.url}`}>
          Dashboard
        </NavLink>
        <NavLink to={`${match.url}/appointments`}>Appointments</NavLink>
        <NavLink to={`${match.url}/statistics`}>Statistics</NavLink>
        <NavLink to={`${match.url}/messages`}>Messages</NavLink>
        <NavLink to={`${match.url}/notifications`}>Notifications</NavLink>
      </div>
    </div>
  );
};

export default SideNav;
