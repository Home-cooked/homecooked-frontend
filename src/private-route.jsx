import React, { useState, useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuthUser } from "./hooks/auth-user";
import Login from "./containers/login";

const PRoute = ({ children, history, ...rest }) => {
  const { user, loading } = useAuthUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loading ? <CircularProgress /> : !!user ? children : <Login />
      }
    />
  );
};

export default withRouter(PRoute);
