import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default ({ submitGroups }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(Array.from(submitGroups, () => false));

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div">
          Host Post Applicant Groups
        </ListSubheader>
      }
      className={classes.root}
    >
      {submitGroups.map(({ users, note, id }, i) => (
        <React.Fragment>
          <ListItem
            key={`${id}-1`}
            button
            onClick={() =>
              setOpen(open.map((el, idx) => (idx == i ? !el : el)))
            }
          >
            <AvatarGroup max={3} spacing="small">
              {users.map(({ pic, full_name, id }) => (
                <Avatar key={id} alt={full_name} src={pic} />
              ))}
            </AvatarGroup>
            <ListItemText
              primary={users.map(({ full_name }) => full_name).join(",")}
            />
            {open[i] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse key={`${id}-2`} in={open[i]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>Note: {note}</ListItem>
              {users.map(({ pic, full_name, id }) => (
                <Link to={`/profile/${id}`}>
                  <ListItem key={id} button>
                    <ListItemAvatar>
                      <Avatar alt={full_name} src={pic} />
                    </ListItemAvatar>
                    <ListItemText primary={full_name} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};
