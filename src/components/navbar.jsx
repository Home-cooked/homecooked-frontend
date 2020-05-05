import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import Link from "./styled-link";
import clsx from "clsx";
import { useAuthUser } from "../hooks/auth-user";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: "#c1c1c1"
  },
  closed: {
    width: "60px"
  },
  respectiveList: {
    width: "inherit"
  },
  link: {
    color: theme.palette.text.secondary
  },
  hidden: {
    overflow: "hidden"
  }
}));

const NavItem = ({ path, children, label }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <Link className={classes.link} to={path} key={path}>
      <ListItem button selected={pathname == path}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText className={classes.link} primary={label} />
      </ListItem>
    </Link>
  );
};

export default () => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const { user } = useAuthUser();

  return user ? (
    <Drawer
      open
      anchor="left"
      variant="permanent"
      className={clsx(classes.paper, !hover && classes.closed)}
      classes={{ paper: clsx(classes.respectiveList, classes.hidden) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <List>
        <NavItem path={"/map"} label="Map">
          <MapIcon />
        </NavItem>
        <NavItem path={`/profile/${user.id}`} label="Profile">
          <PersonOutlineOutlinedIcon />
        </NavItem>
        <NavItem path={"/notifications"} label="Notifications">
          <NotificationsIcon />
        </NavItem>
      </List>
    </Drawer>
  ) : (
    <span />
  );
};
