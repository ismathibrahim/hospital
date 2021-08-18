import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import Header from "../../components/Layout/Header";

import "../Dashboard.scss";

const patientLinks = [
  {
    name: "Dashboard",
    path: "",
  },
  {
    name: "Appointments",
    path: "/appointments",
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
          <Route path={"/appointments"}></Route>
          <Route exact path={match.path}></Route>
        </Switch>
      </div>
    </div>
  );
};

export default PatientDashboard;
