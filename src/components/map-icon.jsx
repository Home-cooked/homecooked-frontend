import React, { useState } from "react";
import { format } from "date-fns";
import Link from "./styled-link";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  cardRoot: {
    display: "flex",
    cursor: "pointer"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: "5px"
  }
}));

export default ({ title, event_time, wanted, pic, id, user }) => {
  const classes = useStyles();

  return (
    <PopupState variant="popover" popupId="demoPopover">
      {popupState => (
        <div>
          <Link to={`host-post/${id}`}>
            <HomeIcon {...bindHover(popupState)} />
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              disableRestoreFocus
            >
              <Card
                className={classes.cardRoot}
                onMouseLeave={popupState.close}
              >
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {title}
                    </Typography>
                    <Grid container>
                      <Grid item container xs={12}>
                        <Grid item>
                          <Avatar
                            src={user.pic}
                            alt={user.first_name}
                            className={classes.smallAvatar}
                          />{" "}
                        </Grid>
                        <Grid item>
                          <Typography>
                            {`${user.full_name}  @${user.user_name}`}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          {format(new Date(Date.now()), "MMM do h:mma")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </div>
                <CardMedia className={classes.cover} image={pic} />
              </Card>
            </Popover>
          </Link>
        </div>
      )}
    </PopupState>
  );
};
