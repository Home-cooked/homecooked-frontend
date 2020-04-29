import React, { useState, useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { useAuthUser } from "./hooks/auth-user";
import Login from "./containers/login";

const PRoute = ({ children, history, ...rest }) => {
  const { user } = useAuthUser();
  return (
    <Route
      {...rest}
      render={({ location }) => (!!user ? children : <Login />)}
    />
  );
};

export default withRouter(PRoute);
