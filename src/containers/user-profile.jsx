import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ContentPage from "../components/content-page";
import Window from "../components/window-95";
import { aFetch, useAuthUser } from "../hooks/auth-user";

const useStyles = makeStyles(theme => ({
  cardRoot: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    height: 200,
    width: 200
  }
}));

export default () => {
  const {
    user: { full_name, user_name, pic, created_at, about_me },
    setUser
  } = useAuthUser();
  const classes = useStyles();

  return (
    <ContentPage>
      <Window title={`EnterPrized™ Customer - ${full_name}`}>
        <Card className={classes.cardRoot}>
          <CardMedia className={classes.cover} image={pic} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h4" variant="h4">
                {full_name}
              </Typography>
              <Typography variant="subtitle2" >
                {user_name}
              </Typography>
              <Typography variant="subtitle2" >
                Member since: {format(new Date(created_at), "MMM do h:mma")}
              </Typography>
              <Typography variant="body1">{about_me}</Typography>
              <Link to="/profile/edit">
                <Button variant="contained">Edit</Button>
              </Link>
              <Link to="/login" onClick={()=> {
                localStorage.removeItem('token');
                setUser(undefined); 
              }}>
                <Button variant="contained">Logout</Button>
              </Link>
            </CardContent>
          </div>
        </Card>
      </Window>
    </ContentPage>
  );
};
