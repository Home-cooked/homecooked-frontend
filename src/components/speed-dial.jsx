import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AddIcon from '@material-ui/icons/Add';
import { useAuthUser } from "../hooks/auth-user";

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'fixed',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(4),
      right: theme.spacing(5),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(4),
      left: theme.spacing(5),
    },
  },
}));

const actions = [
  { icon: <HomeOutlinedIcon />, name: 'Host Post', link: '/host-post-create' },
];

export default withRouter(({ history }) => {
  const classes = useStyles();
  const { user } = useAuthUser();
  const [open, setOpen] = useState(false);
  
  return user ? (
    <SpeedDial
      ariaLabel="SpeedDial"
      direction={"up"}
      open={open}
      icon={<AddIcon/>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      className={classes.speedDial}
    >
      {actions.map(({name, icon, link}) => (
            <SpeedDialAction
              key={name}
              icon={icon}
              tooltipTitle={name}
              onClick={() => {
                setOpen(false);
                history.push(link);
              }}
            >
              <component/>
            </SpeedDialAction>
          ))}
    </SpeedDial>
  ): <span/>;
});
