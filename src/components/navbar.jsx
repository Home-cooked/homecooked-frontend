import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";

import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: "#c1c1c1"
  },
  icon: {
    height: "35px"
  }
}));

const NavItem = ({ iconOnly, path, children, label }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <ListItem component={Link} to={path} selected={pathname == path}>
      <ListItemIcon className={classes.icon}>{children}</ListItemIcon>
      <ListItemText hidden={iconOnly} primary={label} />
    </ListItem>
  );
};

export default () => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  return (
    <Drawer
      open
      anchor="left"
      variant="permanent"
      classes={{ paper: classes.paper }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <List>
        <NavItem iconOnly={!hover} path={"/map"} label="Map">
          <MapIcon />
        </NavItem>
        <NavItem iconOnly={!hover} path={"/profile"} label="Profile">
          <PersonOutlineOutlinedIcon />
        </NavItem>
      </List>
    </Drawer>
  );
};
