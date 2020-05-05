import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Window from "../components/window-95";
import ContentPage from "../components/content-page";
import PlaceInput from "../components/place-input";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { DateTimePicker } from "@material-ui/pickers";
import ImageUpload from "../components/image-upload";
import { aFetch } from "../hooks/auth-user";

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

export default withRouter(({ history }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(undefined);
  const [dateTime, setDateTime] = useState(null);
  const [address, setAddress] = useState(undefined);
  const [pictures, setPictures] = useState([]);
  const [maxPeople, setMaxPeople] = useState(undefined);
  const [description, setDescription] = useState(undefined);

  const valid =
    title && dateTime && address && pictures.length && maxPeople && description;

  const submit = async () => {
    const uploadImg = async image => {
      const body = new FormData();
      body.append("photo", image);
      return await aFetch("/mp/image-upload", {
        method: "POST",
        noContent: true,
        body
      });
    };

    const image_urls = await Promise.all(pictures.map(pic => uploadImg(pic)));

    const resp = await aFetch("/api/host-post/", {
      method: "POST",
      body: JSON.stringify({
        title,
        body: description,
        event_time: dateTime.getTime(),
        max_size: maxPeople,
        wanted: [],
        pic: image_urls[0].image_url,
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng(),
        place_id: address.place_id,
        address: address.description
      })
    });

    history.push("/map");
  };

  return (
    <ContentPage>
      <Window title="Host Post Executive Experience Form">
        <Paper square>
          <Grid container spacing={3} className={classes.undoPadding}>
            <Grid item xs={6}>
              <ImageUpload onChange={pics => setPictures(pics)} />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Title"
                  variant="outlined"
                  className={classes.fill}
                  onChange={({ target: { value } }) => setTitle(value)}
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
                  label="Event Time"
                  inputVariant="outlined"
                  required
                  value={dateTime}
                  className={classes.fill}
                  onChange={time => setDateTime(time)}
                  disablePast={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Max People"
                  type="number"
                  className={classes.fill}
                  onChange={({ target: { value } }) => setMaxPeople(value)}
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
                onChange={({ target: { value } }) => setDescription(value)}
              />
            </Grid>
            <Grid container justify="flex-end" item xs={12}>
              <Grid item xs={3}>
                <Button onClick={() => history.goBack()}>Cancel</Button>
                <Button
                  disabled={!valid}
                  color="primary"
                  variant="contained"
                  onClick={() => submit()}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Window>
    </ContentPage>
  );
});
