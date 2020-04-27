import "regenerator-runtime/runtime";

import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PRoute from "./private-route";
import Nav from "./components/navbar";
import NotFound from "./components/not-found";
import ContentPage from "./components/content-page";
import Login from "./containers/login";
import UserProfile from "./containers/user-profile";
import CompleteSignUp from "./containers/complete-signup";
import CreateHostPost from "./containers/create-host-post";
import { ParseLoginCallbackRoute, isAuthenticated } from "./auth-req";

import { Button } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0f2fa3"
    },
    secondary: {
      main: "#c1c1c1"
    },
    microsoft: {
      // Incorperate better
      grey: "#c1c1c1",
      green: "#008080"
    }
  }
});


let Home = () => <div>Welcome valued enterprise customer</div>;
render(
  <div>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/parse_credentials/:token">
            <ParseLoginCallbackRoute />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/404">
            <NotFound />
          </Route>
          <Route exact path="/">
            <ContentPage>
              <Home />
            </ContentPage>
          </Route>

          <PRoute path="/complete-signup">
            <CompleteSignUp />
          </PRoute>
          <PRoute path="/host-post/create">
            <CreateHostPost />
          </PRoute>
          <PRoute path="/profile">
            <UserProfile />
          </PRoute>
          <PRoute exact={!isAuthenticated()} path="/">
            <Nav />
          </PRoute>
        </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </div>,
  document.getElementById("root")
);
