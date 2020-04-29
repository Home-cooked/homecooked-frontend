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
import OtherUserProfile from "./containers/other-user-profile";
import EditUserProfile from "./containers/edit-user";
import CompleteSignUp from "./containers/complete-signup";
import CreateHostPost from "./containers/create-host-post";
import ShowHostPost from "./containers/show-host-post";
import MapLayout from "./containers/map-layout";
import { ParseLoginCallbackRoute, ProvideAuthUser  } from "./hooks/auth-user";

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
          <ProvideAuthUser>
          <PRoute path="/complete-signup">
            <CompleteSignUp />
          </PRoute>
          <PRoute path="/host-post/create">
            <CreateHostPost />
          </PRoute>
          <PRoute path="/host-post/:host_post_id">
            <ShowHostPost/>
          </PRoute>
          <PRoute path="/map">
            <MapLayout />
          </PRoute>
          <PRoute path="/profile/edit">
            <EditUserProfile/>
          </PRoute>
          <PRoute exact path="/profile">
            <UserProfile />
          </PRoute>
           <PRoute path="/profile/:user_id">
            <OtherUserProfile />
          </PRoute>

          <PRoute path="/">
            <Nav />
          </PRoute>
  </ProvideAuthUser>
        </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
,
  document.getElementById("root")
);
