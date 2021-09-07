import React, { FormEvent, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { registerPatient } from "../../lib/api/patients";
import { composeDateString } from "../../lib/utils/time";
import "./Register.scss";

const Register = () => {
  const { login, logout } = useUserContext();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    day: "",
    month: "",
    year: "",
    phone: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const body = {
        name,
        email,
        password,
        gender,
        phone,
        birthday: composeDateString(year, month, day),
      };
      const response = await registerPatient(body);

      if (response.token) {
        localStorage.setItem("token", response.token);
        login();
      } else {
        logout();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const { name, email, password, day, month, year, gender, phone } = inputs;
  return (
    <div className="login-page">
      <div className="wrapper card">
        <h2>Register Patient</h2>
        <form onSubmit={onSubmitForm}>
          <p>Name</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => onChange(e)}
          />
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => onChange(e)}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => onChange(e)}
          />
          <p>Gender</p>
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            required
            value={gender}
            onChange={(e) => onChange(e)}
          />
          <p>Birthday</p>
          <div className="birthday-input">
            <input
              type="text"
              name="day"
              placeholder="DD"
              required
              value={day}
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              name="month"
              placeholder="MM"
              required
              value={month}
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              name="year"
              placeholder="YYYY"
              required
              value={year}
              onChange={(e) => onChange(e)}
            />
          </div>

          <p>Phone</p>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            value={phone}
            onChange={(e) => onChange(e)}
          />
          <div className="buttons">
            <Link to="/patient/login">Login</Link>
            <button>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
