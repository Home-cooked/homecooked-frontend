import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { aFetch } from "../hooks/auth-user";
import Link from "./styled-link";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  },
  spacedWindow: {
    marginTop: "50px"
  }
}));

export default ({ submitGroups, setPost, respondToGroup }) => {
  const classes = useStyles();
  const { host_post_id } = useParams();
  const [open, setOpen] = React.useState(Array.from(submitGroups, () => false));
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(
    () => {
      if (submitGroups.length == 0) {
        setModalOpen(false);
      }
    },
    [submitGroups]
  );

  return (
    <div>
      <Button
        startIcon={<RestaurantIcon />}
        variant="contained"
        color="primary"
        disabled={submitGroups.length == 0}
        onClick={() => setModalOpen(true)}
      >
        {submitGroups.length == 0
          ? "No Pending Requests"
          : "Respond To Requests!"}
      </Button>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>These Groups Want To Join!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose which groups of users you want at your event. Watch your max
            remaining!
          </DialogContentText>
        </DialogContent>
        <List>
          {submitGroups.map(({ users, note, id }, i) => (
            <React.Fragment>
              <ListItem
                key={`${id}-1`}
                button
                onClick={() =>
                  setOpen(open.map((el, idx) => (idx == i ? !el : el)))
                }
              >
                <AvatarGroup max={8} spacing="small">
                  {users.map(({ pic, full_name, id }) => (
                    <Avatar key={id} alt={full_name} src={pic} />
                  ))}
                </AvatarGroup>
                <ListItemText
                  primary={users.map(({ full_name }) => full_name).join(",")}
                />
                <CheckCircleIcon
                  onClick={e => {
                    e.stopPropagation();
                    respondToGroup(id, true);
                  }}
                />
                <CancelIcon
                  onClick={e => {
                    e.stopPropagation();
                    respondToGroup(id, false);
                  }}
                />
                {open[i] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                key={`${id}-2`}
                in={open[i]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem className={classes.nested}>
                    <Typography>Note: {note}</Typography>
                  </ListItem>
                  {users.map(({ pic, full_name, id }) => (
                    <Link key={id} to={`/profile/${id}`}>
                      <ListItem button>
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
      </Dialog>
    </div>
  );
};
