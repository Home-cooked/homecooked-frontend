import React, { useState } from "react";
import { format } from "date-fns";
// import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";

const useStyles = makeStyles(theme => ({
  cardRoot: {
    display: "flex"
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
  }
}));

export default ({ title, event_time, wanted, pic, id }) => {
  const classes = useStyles();

  return (
    <PopupState variant="popover" popupId="demoPopover">
      {popupState => (
        <div>
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
            <Link to={`host-post/${id}`}>
              <Card className={classes.cardRoot}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {title}
                    </Typography>
                    <Typography variant="subtitle1">
                      {format(new Date(Date.now()), "MMM do h:mma")}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia className={classes.cover} image={pic} />
              </Card>
            </Link>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};
