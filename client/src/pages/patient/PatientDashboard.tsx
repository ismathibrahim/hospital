import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import Header from "../../components/Layout/Header";

import "../Dashboard.scss";
import PatientAppointments from "./PatientAppointments";
import Doctors from "./Doctors";
import DoctorPage from "./DoctorPage";
import AppointmentDetails from "./AppointmentDetails";
import DashboardPage from "./DashboardPage";

const patientLinks = [
  {
    name: "Dashboard",
    path: "",
    exact: true,
  },
  {
    name: "Appointments",
    path: "/appointments",
    exact: false,
  },
  {
    name: "Doctors",
    path: "/doctors",
    exact: false,
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
          <Route exact path={`${match.path}/appointments`}>
            <PatientAppointments />
          </Route>
          <Route path={`${match.path}/appointments/:id`}>
            <AppointmentDetails />
          </Route>
          <Route exact path={`${match.path}/doctors`}>
            <Doctors />
          </Route>
          <Route path={`${match.path}/doctors/:id`}>
            <DoctorPage />
          </Route>
          <Route exact path={match.path}>
            <DashboardPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default PatientDashboard;
