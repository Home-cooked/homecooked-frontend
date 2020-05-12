import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Grid from "@material-ui/core/Grid";
import Link from "./styled-link";

const useStyles = makeStyles(theme => ({
  undoGroupNegMargin: {
    marginLeft: "15px"
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: "5px"
  },
  fauxLink: {
    color: theme.palette.microsoft.green,
    cursor: "pointer"
  }
}));

export default ({ title, people }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Grid
        onClick={() => setOpen(true)}
        container
        className={classes.fauxLink}
      >
        <Typography variant="subtitle1">{title}:</Typography>
        <div className={classes.undoGroupNegMargin}>
          <AvatarGroup max={13} spacing="small">
            {people.map(({ id, pic, first_name }) => (
              <Avatar
                key={id}
                alt={first_name}
                src={pic}
                className={classes.smallAvatar}
              />
            ))}
          </AvatarGroup>
        </div>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {people.map(({ pic, id, full_name, user_name }) => (
            <Link key={id} to={`/profile/${id}`}>
              <CardHeader
                avatar={<Avatar alt={full_name} src={pic} />}
                title={<span>{full_name}</span>}
                subheader={`@${user_name}`}
              />
            </Link>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
