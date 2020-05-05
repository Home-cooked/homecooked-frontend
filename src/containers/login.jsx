import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Window from "../components/window-95";
import ContentPage from "../components/content-page";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const googleSignUp = async () => {
  let url = `${process.env.SERVER_DOMAIN || ""}/auth/google`;
  const resp = await fetch(url, {
    "Content-Type": "application/json",
    redirect: "manual"
  });
  window.location.href = resp.url;
};

const Icon = ({ network, cb }) => (
  <SocialIcon
    network={network}
    style={{ cursor: "pointer" }}
    onClick={() => cb()}
  />
);

const useStyles = makeStyles(theme => ({
  prompt: { padding: "13px" },
  item: { cursor: "pointer" }
}));

export default () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  return (
    <ContentPage>
      <Window title="Digital Portal Enterprise Access">
        <Paper square>
          <div className={classes.prompt}>
            <Typography>Enter with one of the following providers</Typography>
          </div>
          <List>
            <ListItem className={classes.item} onClick={() => googleSignUp()}>
              <ListItemAvatar>
                <Avatar>
                  <Icon network={"google"} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Google" />
            </ListItem>
          </List>
        </Paper>
      </Window>
    </ContentPage>
  );
};
