import React from "react";
import { Drawer, List, ListItem } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: "#c1c1c1"
  }
}));

const navbar = ({ path }) => {
  const classes = useStyles();
  return (
    <Drawer
      open
      anchor="left"
      variant="permanent"
      classes={{ paper: classes.paper }}
    >
      <List>
        <ListItem selected={path === "404"}>
          <IconButton component={Link} to="404">
            <AlarmIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton selected={path === "profile"} component={Link} to="profile">
            <PersonOutlineOutlinedIcon />
          </IconButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default withRouter(navbar);
