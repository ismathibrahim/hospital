import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import Header from "../../components/Layout/Header";

import "../Dashboard.scss";
import PatientAppointments from "./PatientAppointments";
import Doctors from "./Doctors";
import DoctorPage from "./DoctorPage";

const patientLinks = [
  {
    name: "Dashboard",
    path: "",
  },
  {
    name: "Appointments",
    path: "/appointments",
  },
  {
    name: "Doctors",
    path: "/doctors",
  },
];

const PatientDashboard = () => {
  const { user } = useUserContext();
  let match = useRouteMatch();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  if (user === null) return null;

  return (
    <div className="dashboard">
      <Header userName={user?.patientProfile?.name} links={patientLinks} />
      <div className="container">
        <Switch>
          <Route exact path={match.path}>
            Dashboard
          </Route>
          <Route path={`${match.path}/appointments`}>
            <PatientAppointments />
          </Route>
          <Route exact path={`${match.path}/doctors`}>
            <Doctors />
          </Route>
          <Route path={`${match.path}/doctors/:id`}>
            <DoctorPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default PatientDashboard;
