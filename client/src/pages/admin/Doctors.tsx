import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import { getAllDoctors } from "../../lib/api/doctors";
import { Doctor } from "../../lib/types";

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[] | null>(null);
  let match = useRouteMatch();
  useEffect(() => {
    const fetchAPI = async () => {
      setDoctors(await getAllDoctors());
    };
    fetchAPI();
    // eslint-disable-next-line
  }, []);

  if (doctors === null) return <div>Loading...</div>;
  if (!doctors.length) return <div>No Doctors</div>;
  return (
    <div>
      <h1>Doctors</h1>
      <Link to="/portal/new-doctor">
        {" "}
        <button>New Doctor</button>
      </Link>
      {doctors.map((doctor: Doctor) => (
        <div key={doctor.id} className="doctor-card">
          <div>{doctor.name}</div>
          <div>{doctor.specialty?.name}</div>
          <div>{doctor.gender}</div>
          <div>{doctor.qualification}</div>
          <div>experience: {doctor.experience}</div>
          <Link to={`${match.path}/${doctor.id}`}>Continue</Link>
        </div>
      ))}
    </div>
  );
};

export default Doctors;
