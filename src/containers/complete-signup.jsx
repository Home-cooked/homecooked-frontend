import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { aFetch } from "../hooks/auth-user";
import ContentPage from "../components/content-page";
import Window from "../components/window-95";

const CompleteSignUp = ({history}) => {
  const [user_name, setUserName] = useState(undefined);
  const [valid, setValid] = useState(undefined);
  const [error_message, setErrorMessage] = useState(undefined);

  useEffect(
    () => {
      // TODO write a hook for this pattern and debounce
      let preempted = false;
      if (user_name === "") {
        setErrorMessage(undefined);
        return;
      }
      const req = async () => {
        const { taken } = await aFetch(`/api/check-user-name/${user_name}`);
        if (!preempted) {
          setValid(!taken);
          setErrorMessage(taken ? `"${user_name}" is unavailable` : undefined);
        }
      };
      req();
      return () => {
        preempted = true;
      };
    },
    [user_name]
  );

  const submit = async (user_name) => {
    // setUser(
    //   await aFetch(({id}) => `/api/users/${id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({user: {user_name}})
    //   })
    // );
    history.push('/');
  };

  return (
    <ContentPage>
      <Window title="Digital Solutions Custom Identifier">
        <Typography>
          <Paper square>
            <TextField
              label="Choose Username"
              value={user_name}
              onChange={({ target: { value } }) => setUserName(value)}
              error={!valid}
              helperText={error_message}
            />
            <br />
            <Button
              disabled={!valid}
              onClick={() => submit(user_name)}>
              Submit
            </Button>
          </Paper>
        </Typography>
      </Window>
    </ContentPage>
  );
};

export default withRouter(CompleteSignUp);
