import React, { FormEvent, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
const Register = () => {
  const { login, logout } = useUserContext();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const body = { name, email, password };
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        login();
      } else {
        logout();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const { name, email, password } = inputs;
  return (
    <div className="login-page">
      <div className="wrapper card">
        <h2>Register Patient</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="form-control my-3"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="form-control my-3"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="form-control my-3"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <div className="buttons">
            <Link to="/patient/login">Login</Link>
            <button className="btn btn-success btn-block">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
