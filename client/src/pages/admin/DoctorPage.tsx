import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { getDoctor } from "../../lib/api/doctors";
import { Doctor } from "../../lib/types";

const DoctorPage = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  let match = useRouteMatch<{ id: string }>();
  useEffect(() => {
    const fetchAPI = async () => {
      setDoctor(await getDoctor(Number(match.params.id)));
    };
    fetchAPI();
    // eslint-disable-next-line
  }, []);

  if (doctor === null) return <div>Loading...</div>;
  // if (!doctors === undefined) return <div>No Doctors</div>;
  return (
    <div className="-admin-doctor-page">
      <h1>{doctor.name}</h1>

      <div key={doctor.id} className="doctor-card">
        <div>{doctor.specialty?.name}</div>
        <div>{doctor.gender}</div>
        <div>{doctor.qualification}</div>
        <div>experience: {doctor.experience}</div>
      </div>
    </div>
  );
};

export default DoctorPage;
