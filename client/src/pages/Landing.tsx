import React from "react";
import {} from "react-router";
import { Link, RouteComponentProps } from "react-router-dom";

const Landing = () => {
  return (
    <div className="mt-5">
      <h1>Welcome to Clinic</h1>
      <p>Lorem ipsum dolor sit amet.</p>
      <Link to="/patient/login">Patient Login</Link>
      <Link to="/patient/register" style={{ marginLeft: "15px" }}>
        Patient Register
      </Link>
      <br />
      <br />
      <Link to="/doctor/login">Doctor Login</Link>
      <Link to="/doctor/register" style={{ marginLeft: "15px" }}>
        Doctor Register
      </Link>
      <br />
      <br />
      <Link to="/admin/login">Admin Login</Link>
      <Link to="/admin/register" style={{ marginLeft: "15px" }}>
        Admin Register
      </Link>
    </div>
  );
};

export default Landing;
