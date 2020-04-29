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
import ImageUpload from "../components/image-upload";
import { aFetch, useAuthUser } from "../hooks/auth-user";

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
  const { user, setUser } = useAuthUser();
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [userName, setUserName] = useState(user.user_name);
  const [picture, setPicture] = useState(undefined);
  const [aboutMe, setAboutMe] = useState(undefined);

  const valid = firstName && lastName && userName && picture && aboutMe;

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

    const { image_url } = await uploadImg(picture);

    const resp = await aFetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          user_name: userName,
          pic: image_url,
          about_me: aboutMe
        }
      })
    });

    setUser(resp.data);

    history.push("/profile");
  };

  return (
    <ContentPage>
      <Window title={`EnterPrized™ Customer - ${user.full_name}`}>
        <Paper square>
          <Grid container spacing={3} className={classes.undoPadding}>
            <Grid item xs={6}>
              <ImageUpload
                fileLimit={1}
                onChange={pics => setPicture(pics[0])}
              />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  value={firstName}
                  label="First Name"
                  variant="outlined"
                  onChange={({ target: { value } }) => setFirstName(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  value={lastName}
                  label="Last Name"
                  variant="outlined"
                  onChange={({ target: { value } }) => setLastName(value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  value={userName}
                  label="User Name"
                  variant="outlined"
                  className={classes.fill}
                  onChange={({ target: { value } }) => setUserName(value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={aboutMe}
                  multiline
                  rows={3}
                  label="About Me"
                  variant={"outlined"}
                  className={classes.fill}
                  onChange={({ target: { value } }) => setAboutMe(value)}
                />
              </Grid>
            </Grid>
            <Grid container justify="flex-end" item xs={12}>
              <Grid item xs={3}>
                <Button>Cancel</Button>
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
