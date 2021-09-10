import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { getAllDoctors } from "../../lib/api/doctors";
import Doctors from "./Doctors";

const DoctorsContainer = () => {
  const [doctors, setDoctors] = useState(null);

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

  return <Doctors doctors={doctors} />;
};

export default DoctorsContainer;
