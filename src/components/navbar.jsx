import React from "react";
import { Drawer, List, ListItem } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from '@material-ui/icons/Map';
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: "#c1c1c1"
  }
}));

export default () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <Drawer
      open
      anchor="left"
      variant="permanent"
      classes={{ paper: classes.paper }}
    >
      <List>
        <ListItem selected={pathname == "/map"}>
          <IconButton component={Link} to="/map">
            <MapIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton selected={pathname == "/profile"} component={Link} to="/profile">
            <PersonOutlineOutlinedIcon />
          </IconButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
