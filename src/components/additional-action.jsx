import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

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

export const AdditionalActionItem = ({ icon, label, onClick }) => (
  <MenuItem onClick={onClick}>
    <ListItemIcon>
      {React.cloneElement(icon, { fontSize: "small" })}
    </ListItemIcon>
    <ListItemText primary={label} />
  </MenuItem>
);

export default ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div>
      <IconButton
        variant="contained"
        onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {children}
      </StyledMenu>
    </div>
  );
};
