import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Window from "./window-95";
import stringToColor from "../helper/string-to-color";
import Link from "./styled-link";

export const Message = ({ user_id, message, user_name, full_name, pic }) => (
  <CardHeader
    avatar={<Avatar alt={full_name} src={pic} />}
    title={
      <span>
        {full_name} <Link to={`/profile/${user_id}`}>@{user_name}</Link>
      </span>
    }
    subheader={message}
  />
);

const useStyles = makeStyles(theme => ({
  spacedWindow: {
    marginTop: "50px",
    marginBottom: "50px"
  },
  noComments: {
    height: "50px",
    paddingTop: "20px",
    textAlign: "center"
  }
}));

export const MessageList = ({ messages, onSubmit }) => {
  const classes = useStyles();
  const [message, setMessage] = useState(undefined);
  return (
    <Window className={classes.spacedWindow} title={"Questions and Comments"}>
      <Paper square style={{ width: "500px" }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {messages && messages.length ? (
              messages.map(m => <Message key={m.id} {...m} />)
            ) : (
              <div className={classes.noComments}>
                <Typography color="secondary">No Questions/Comments</Typography>
              </div>
            )}
          </Grid>
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs={11}>
              <TextField
                label="Message"
                value={message}
                fullWidth
                rowsMax={4}
                variant="outlined"
                multiline
                style={{ margin: "4px" }}
                onChange={({ target: { value } }) => setMessage(value)}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  onSubmit(message);
                  setMessage("");
                }}
              >
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Window>
  );
};
