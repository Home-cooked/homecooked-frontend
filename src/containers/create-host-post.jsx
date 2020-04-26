import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Window from "../components/window-95";
import ContentPage from "../components/content-page";
import PlaceInput from "../components/place-input";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { DateTimePicker } from "@material-ui/pickers";
import ImageUpload from "../components/image-upload";

const useStyles = makeStyles(theme => ({
  fill: {
    width: "100%"
  },
  undoPadding: {
    width: "100%",
    padding: "6px",
    margin: "0px"
  }
}));

export default () => {
  const classes = useStyles();
  // const [chips, setChips] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [address, setAddress] = useState(undefined);
  const [pictures, setPictures] = useState([]);

  return (
    <ContentPage>
      <Window title="Host Post Executive Experience Form">
        <Paper square>
          <Grid container spacing={3} className={classes.undoPadding}>
            <Grid item xs={6}>
              <ImageUpload />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Title"
                  variant="outlined"
                  className={classes.fill}
                />
              </Grid>
              <Grid item xs={12}>
                <PlaceInput
                  className={classes.fill}
                  onSelect={addr => setAddress(addr)}
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  label="DateTimePicker"
                  inputVariant="outlined"
                  required
                  value={dateTime}
                  className={classes.fill}
                  onChange={time => setDateTime(time)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Max People"
                  type="number"
                  className={classes.fill}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                multiline
                rows={4}
                label="Description"
                variant={"outlined"}
                className={classes.fill}
              />
            </Grid>
          </Grid>
        </Paper>
      </Window>
    </ContentPage>
  );
};
