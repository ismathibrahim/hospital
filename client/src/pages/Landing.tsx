import React from "react";
import {} from "react-router";
import { Link, RouteComponentProps } from "react-router-dom";

const Landing = () => {
  return (
    <div className="mt-5">
      <h1>Welcome to Hospital</h1>
      <Link to="/patient/login">Patient Login</Link>
      <Link to="/patient/register" style={{ marginLeft: "15px" }}>
        Patient Register
      </Link>
      <br />
      <br />
      <Link to="/doctor/login">Doctor Login</Link>
      <br />
      <br />
      <Link to="/admin/login">Admin Login</Link>
    </div>
  );
};

export default Landing;
