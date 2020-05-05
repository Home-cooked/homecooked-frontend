import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    {...props}
  />
));

export const AdditionalActionItem = ({ icon, label, className, onClick }) => {
  return (
    <MenuItem onClick={e => onClick(e)} className={className}>
      <ListItemIcon>
        {React.cloneElement(icon, { fontSize: "small" })}
      </ListItemIcon>
      <ListItemText primary={label} />
    </MenuItem>
  );
};

export default ({ children }) => (
  <PopupState variant="popover">
    {popupState => (
      <React.Fragment>
        <IconButton variant="contained" {...bindTrigger(popupState)}>
          <MoreVertIcon />
        </IconButton>
        <StyledMenu {...bindMenu(popupState)} keepMounted>
          <div>{children}</div>
        </StyledMenu>
      </React.Fragment>
    )}
  </PopupState>
);
