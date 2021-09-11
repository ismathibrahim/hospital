import React, { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { registerDoctor } from "../../lib/api/doctors";

import Select from "react-select";

import "./Register.scss";
import { Specialty } from "../../lib/types";
import { getAllSpecialties } from "../../lib/api/specialties";

const NewDoctor = () => {
  const history = useHistory();

  const [specialties, setSpecialties] = useState<Specialty[] | null>(null);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    qualification: "",
    experience: "",
  });

  const [specialtyId, setSpecialtyId] = useState<number | null>(null);

  const onSpecialtyChange = (option: any) => {
    setSpecialtyId(option.value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (specialtyId === null) return;
    try {
      const newDoctor = {
        name,
        email,
        password,
        gender,
        phone,
        specialtyId,
        experience: Number(experience),
        qualification,
      };
      const response = await registerDoctor(newDoctor);

      if (response.id) {
        history.push(`/portal/doctors/${response.id}`);
      } else {
        console.log("Fail");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const specialties = await getAllSpecialties();
      setSpecialties(
        specialties.map((item: Specialty) => ({
          value: item.id,
          label: item.name,
        }))
      );
    };

    fetchAPI();
    // eslint-disable-next-line
  }, []);

  if (specialties === null) return <div>Loading...</div>;

  const { name, email, password, gender, phone, qualification, experience } =
    inputs;
  return (
    <div className="login-page">
      <div className="wrapper card">
        <h2>Register Doctor</h2>
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

          <p>Phone</p>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            value={phone}
            onChange={(e) => onChange(e)}
          />
          <p>Specialty</p>
          <Select options={specialties} onChange={onSpecialtyChange} />
          <p>Qualification</p>
          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            required
            value={qualification}
            onChange={(e) => onChange(e)}
          />
          <p>Experience (years)</p>
          <input
            type="number"
            name="experience"
            placeholder="Experience"
            required
            value={experience}
            onChange={(e) => onChange(e)}
          />
          <div className="buttons">
            <button>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDoctor;
