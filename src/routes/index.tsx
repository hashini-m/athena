import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import { Dashboard, Login, EditTimeEntry } from "../pages";
import PublicRoute from "./PublicRoute";
import { APP_ROUTES } from "../utilities/constants";

const AppRoutes = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <PrivateRoute exact path={APP_ROUTES.DASHBOARD} Component={Dashboard} />
      <PublicRoute exact path={APP_ROUTES.ROOT} Component={Login} />
      <PrivateRoute
        exact
        path={APP_ROUTES.EDIT_TIME_ENTRY}
        Component={EditTimeEntry}
      />
    </Router>
  );
};

export default AppRoutes;
