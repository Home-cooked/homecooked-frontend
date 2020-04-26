import React, { useState, useEffect } from "react";
import aFetch from "../auth-req";
import ContentPage from "../components/content-page";
import Window from "../components/window-95";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => {
  const [user, setUser] = useState(undefined);
  useEffect(
    () => {
      const req = async () => {
        const { data } = await aFetch('/api/users/self');
        setUser(data);
      };
      req();
    }, []
  );

  if(user){
    const {full_name, user_name} = user;
    return (
    <ContentPage>
      <Window title={`Homecooked Enterprise Customer - ${full_name}`}>
        <Paper square>
          <Typography variant="h2">
            {full_name}
          </Typography>
          <Typography variant="h3">
            {user_name}
          </Typography>
          </Paper>
      </Window>
    </ContentPage>
    );
  } else {
    return (
      <ContentPage>
        <Window title={`Homecooked Enterprise Customer`}>
          <CircularProgress color="inherit"/>
        </Window>
      </ContentPage>
    );
  }
}
