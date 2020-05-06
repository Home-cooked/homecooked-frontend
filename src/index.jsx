import "regenerator-runtime/runtime";

import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PRoute from "./private-route";
import Nav from "./components/navbar";
import NotFound from "./components/not-found";
import MySpeedDial from "./components/speed-dial";
import Login from "./containers/login";
import OtherUserProfile from "./containers/other-user-profile";
import EditUserProfile from "./containers/edit-user";
import CreateHostPost from "./containers/create-host-post";
import ShowHostPost from "./containers/show-host-post";
import MapLayout from "./containers/map-layout";
import { ParseLoginCallbackRoute, ProvideAuthUser } from "./hooks/auth-user";

import { Button } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const defaultTheme = createMuiTheme({});
const theme = createMuiTheme({
  palette: {
    ...defaultTheme.palette,
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
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <ProvideAuthUser>
          <Route path="/">
            <Nav />
            <MySpeedDial />
          </Route>
          <Route path="/parse_credentials/:token">
            <ParseLoginCallbackRoute />
          </Route>

          <PRoute exact path="/" >
            <MapLayout />
          </PRoute>
          <PRoute path="/host-post-create">
            <CreateHostPost />
          </PRoute>
          <PRoute path="/host-post/:host_post_id">
            <ShowHostPost />
          </PRoute>
          <PRoute path="/map">
            <MapLayout />
          </PRoute>
          <PRoute path="/profile-edit">
            <EditUserProfile />
          </PRoute>
          <PRoute path="/profile/:user_id">
            <OtherUserProfile />
          </PRoute>
          <PRoute path="/notifications">
            <div
              style={{
                margin: "0px auto",
                width: "200px",
                marginTop: "300px "
              }}
            >
              Under construction
            </div>
          </PRoute>
        </ProvideAuthUser>
      </Router>
    </ThemeProvider>
  </MuiPickersUtilsProvider>,
  document.getElementById("root")
);
