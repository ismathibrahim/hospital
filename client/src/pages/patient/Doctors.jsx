import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import Select from "react-select";

import { getAllDoctors } from "../../lib/api/doctors";
import { Doctor } from "../../lib/types";
import { getUniqueFilters } from "../../lib/utils/filter";

import "./Doctors.scss";

const Doctors = ({ doctors }) => {
  const [filterState, setFilterState] = useState({});
  const [filteredDoctors, setFilteredDoctors] = useState();
  let match = useRouteMatch();

  let filterAttributes = ["Gender", "Qualification", "Experience"];
  let filters = getUniqueFilters(doctors, filterAttributes);

  useEffect(() => {
    setFilteredDoctors(getFilteredDoctors());
    // eslint-disable-next-line
  }, [filterState]);

  const getFilteredDoctors = () => {
    if (doctors === null) return;
    return doctors.filter((doctor) => {
      let isMatch = true;
      Object.keys(filterState).forEach((filter) => {
        if (doctor[filter] !== filterState[filter]) {
          isMatch = false;
        }
      });
      return isMatch;
    });
  };

  const addFilter = (key, value) => {
    setFilterState((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const removeFilter = (keyToRemove) => {
    setFilterState((prevFilters) => {
      return Object.keys(prevFilters).reduce((newFilters, key) => {
        if (key !== keyToRemove) {
          newFilters[key] = prevFilters[key];
        }
        return newFilters;
      }, {});
    });
  };

  return (
    <div>
      <h1>Doctors</h1>

      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="card doctor-card">
            <div>
              <strong>{doctor.name}</strong>
            </div>
            <div>{doctor.specialty?.name}</div>
            <div>Gender: {doctor.gender}</div>
            <div>Qualification: {doctor.qualification}</div>
            <div>Experience: {doctor.experience} years</div> <br />
            <Link to={`${match.path}/${doctor.id}`}>Book now</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
