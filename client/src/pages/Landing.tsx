import React from "react";
import {} from "react-router";
import { Link, RouteComponentProps } from "react-router-dom";

import "./Landing.scss";
const Landing = () => {
  return (
    <div className="landing-page">
      <div className="wrapper">
        <h1>Welcome to Hospital</h1>
        <Link to="/patient/login">Patient Login</Link>
        <Link to="/patient/register" style={{ marginLeft: "15px" }}>
          Patient Register
        </Link>
        <br />
        <br />
        <Link to="/doctor/login">Doctor Login</Link>
        <br />
      </div>
    </div>
  );
};

export default Landing;
