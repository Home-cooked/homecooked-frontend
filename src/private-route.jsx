import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { isAuthenticated } from './auth-req';


const PRoute = ({ children, history, ...rest }) => {
  return(
  <Route
    {...rest}
    render={({ location }) =>
            isAuthenticated(history) ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
           }
  />
)};

export default withRouter(PRoute);
