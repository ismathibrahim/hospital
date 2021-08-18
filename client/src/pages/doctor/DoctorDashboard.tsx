import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import Header from "../../components/Layout/Header";

import "../Dashboard.scss";

const doctorLinks = [
  {
    name: "Dashboard",
    path: "",
  },
  {
    name: "Appointments",
    path: "/appointments",
  },
  {
    name: "Setting",
    path: "/settings",
  },
];

const DoctorDashboard = () => {
  const { user } = useUserContext();
  let match = useRouteMatch();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  if (user === null) return null;

  return (
    <div className="dashboard">
      <Header userName={user?.doctorProfile?.name} links={doctorLinks} />
      <div className="container">
        <Switch>
          <Route path={"/appointments"}></Route>
          <Route exact path={match.path}></Route>
        </Switch>
      </div>
    </div>
  );
};

export default DoctorDashboard;
