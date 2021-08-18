import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import InputTodo from "../../components/InputTodo";
import Header from "../../components/Layout/Header";
import SideNav from "../../components/Layout/SideNav";
import ListTodos from "../../components/ListTodos";
import { TodosProvider } from "../../context/TodosContext";
import { UserType } from "../../lib/types";

type Props = {
  user: UserType;
};

const adminLinks = [
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

const AdminAppointments = ({ user }: Props) => {
  let match = useRouteMatch();

  return (
    <div className="dashboard">
      <Header userName="Username" links={adminLinks} />
      <SideNav />
      <div className="container">
        <Switch>
          <Route path={`${match.path}/appointments`}></Route>
          <Route path="/statistics"></Route>
          <Route path="/messages"></Route>
          <Route path="/notifications"></Route>
          <Route exact path={match.path}>
            <TodosProvider>
              <InputTodo />
              <ListTodos />
            </TodosProvider>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default AdminAppointments;
