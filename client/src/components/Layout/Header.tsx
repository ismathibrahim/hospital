import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import "./Header.scss";

type Route = {
  name: string;
  path: string;
  exact: boolean;
};
type HeaderProps = {
  userName: string;
  links: Route[];
};

const Header = ({ userName, links }: HeaderProps) => {
  const { logout } = useUserContext();
  let match = useRouteMatch();
  return (
    <div className="header card">
      <div className="logo">Hospital</div>
      <div className="nav-links">
        {links.map((link: Route) => (
          <NavLink
            key={link.name}
            to={`${match.url}${link.path}`}
            exact={link.exact}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className="profile">
        <div className="avatar">{userName?.split("")[0]}</div>
        <div className="user-name">{userName}&nbsp;&nbsp; &mdash;&nbsp; </div>
        <div className="dropdown">
          <div onClick={logout} className="logout-button">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
