import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  dropDownAvatar: {
    marginRight: "10px"
  },
  chipAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: "10px"
  },
  note: {
    marginTop: "20px"
  }
}));

export default ({ friends, onSubmit, disabled }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [chips, setChips] = useState([]);
  const [note, setNote] = useState("");

  return (
    <div>
      <Button
        disabled={disabled}
        startIcon={<RestaurantIcon />}
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        {disabled ? "In a Pending Group" : "Ask To Join!"}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ask To Join!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask this host if you can join this event. If you're coming with
            friends add them here. Make sure to leave a note for the host!
          </DialogContentText>
          <Autocomplete
            multiple
            options={friends}
            getOptionLabel={({ full_name }) => full_name}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map(({ id, user_name, full_name, pic }, index) => (
                <Chip
                  key={id}
                  avatar={
                    <Avatar
                      className={classes.dropDownAvatar}
                      src={pic}
                      alt={full_name}
                    />
                  }
                  label={full_name}
                  {...getTagProps({ index })}
                />
              ))
            }
            value={chips}
            onChange={(_, value) => setChips(value)}
            filterSelectedOptions
            renderOption={({ full_name, user_name, pic }) => (
              <React.Fragment>
                {pic ? (
                  <Avatar className={classes.dropDownAvatar} src={pic} />
                ) : (
                  <Avatar>{full_name[0]}</Avatar>
                )}
                <Typography>{full_name}</Typography>
                <Typography color="textSecondary">
                  {`  (@${user_name})`}
                </Typography>
              </React.Fragment>
            )}
            renderInput={params => (
              <TextField {...params} variant="outlined" label="Friends" />
            )}
          />
          <TextField
            className={classes.note}
            required
            multiline
            rows={2}
            label="Note"
            variant={"outlined"}
            fullWidth
            placeholder={"Say hello..."}
            onChange={({ target: { value } }) => setNote(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(false);
              onSubmit({ note, users: chips.map(({ id }) => id) });
            }}
            color="primary"
            disabled={!note}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
