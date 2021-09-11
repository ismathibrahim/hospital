import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { loginUser } from "../../lib/api/users";

import "./Login.scss";

const Login = () => {
  const { login, logout } = useUserContext();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password, "DOCTOR");
      if (response.token) {
        localStorage.setItem("token", response.token);
        login(response.user);
      } else {
        logout();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper card">
        <h2>Doctor Signin</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
          />

          <div className="buttons">
            <Link to="/doctor/register">Register</Link>
            <button>Signin</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
