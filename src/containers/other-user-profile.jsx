import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ContentPage from "../components/content-page";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ReportIcon from "@material-ui/icons/Report";
import PowerOffIcon from "@material-ui/icons/PowerOff";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import GroupIcon from "@material-ui/icons/Group";
import EditIcon from "@material-ui/icons/Edit";
import Window from "../components/window-95";
import UserActivity from "../containers/user-activity";
import { aFetch, useAuthUser } from "../hooks/auth-user";
import AdditionalAction, {
  AdditionalActionItem
} from "../components/additional-action";
import Link from "../components/styled-link";

const useStyles = makeStyles(theme => ({
  cardRoot: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    width: "100%"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "40%",
    flexShrink: 0
  },
  profileWindow: {
    width: 700
  },
  quickActions: {
    padding: "15px"
  },
  link: {
    color: theme.palette.text.primary
  }
}));

// TODO split into self/non-self views better, beef up responses
export default () => {
  const classes = useStyles();
  const { user_id } = useParams();
  const [otherUser, setOtherUser] = useState(undefined);
  const { user, setUser } = useAuthUser();

  useEffect(
    () => {
      const req = async () => {
        const data = await aFetch(
          `api/users/${user_id}?friends=true&attending=true${
            user_id === user.id ? "&incoming_friend_requests=true" : ""
          }`
        );
        setOtherUser(data);
      };
      req();
    },
    [user_id]
  );

  const requestFriend = async () => {
    const { pending_friends } = await aFetch(`/api/users/self/request-friend`, {
      method: "POST",
      body: JSON.stringify({
        id: user_id
      })
    });
    setUser({ ...user, pending_friends });
  };

  const unfriend = async () => {
    const {
      data: { friends }
    } = await aFetch(`/api/users/self/unfriend`, {
      method: "DELETE",
      body: JSON.stringify({
        id: user_id
      })
    });
    setUser({
      ...user,
      friends,
      rich_friends: user.rich_friends.filter(({ id }) => id !== user_id)
    });
    setOtherUser({
      ...otherUser,
      rich_friends: user.rich_friends.filter(({ id }) => id !== user.id)
    });
  };

  const respondToReq = async ({ id, val }) => {
    const { friends, incoming_friends, rich_friends } = await aFetch(
      `/api/users/self/friend-response`,
      {
        method: "POST",
        body: JSON.stringify({ id, val })
      }
    );

    setUser({ ...user, friends, incoming_friends, rich_friends });
    setOtherUser({ ...user, friends, incoming_friends, rich_friends });
  };

  return otherUser ? (
    <ContentPage>
      <Window
        title={`EnterPrized™ Customer - ${otherUser.full_name}`}
        className={classes.profileWindow}
      >
        <Card className={classes.cardRoot}>
          <CardMedia className={classes.cover} image={otherUser.pic} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Typography component="h4" variant="h4">
                    {otherUser.full_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <AdditionalAction>
                    {user.friends &&
                      user.friends.includes(user_id) && (
                        <AdditionalActionItem
                          label="Unfriend"
                          onClick={() => unfriend()}
                          icon={<PersonAddDisabledIcon />}
                        />
                      )}
                    {otherUser &&
                      otherUser.id == user.id && [
                        <Link
                          key={"edit"}
                          className={classes.link}
                          to="/profile-edit"
                        >
                          <AdditionalActionItem
                            className={classes.link}
                            label="Edit"
                            icon={<EditIcon />}
                          />
                        </Link>,
                        <AdditionalActionItem
                          label="Logout"
                          key={"logout"}
                          onClick={() => {
                            localStorage.removeItem("token");
                            setUser(undefined);
                          }}
                          icon={<PowerOffIcon />}
                        />
                      ]}

                    {otherUser &&
                      otherUser.id != user.id && (
                        <AdditionalActionItem
                          label="Report"
                          onClick={() => console.log("naughty")}
                          icon={<ReportIcon />}
                        />
                      )}
                  </AdditionalAction>
                </Grid>
              </Grid>
              <Typography variant="subtitle2">
                @{otherUser.user_name}
              </Typography>
              <Typography variant="subtitle2">
                Member since:{" "}
                {format(new Date(otherUser.created_at), "MMM do h:mma")}
              </Typography>
              <Typography variant="body1">{otherUser.about_me}</Typography>
            </CardContent>
            <Grid container justify="flex-end" className={classes.quickActions}>
              <Grid item>
                {user.id !== user_id &&
                  (user.incoming_friends.find(({ id }) => id == user_id) ? (
                    <React.Fragment>
                      <Button
                        variant="contained"
                        onClick={() => respondToReq(true)}
                        startIcon={<PersonAddIcon />}
                        color="primary"
                      >
                        Accept Friend
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => respondToReq(false)}
                        startIcon={<PersonAddDisabledIcon />}
                        color="secondary"
                      >
                        Reject Friend
                      </Button>
                    </React.Fragment>
                  ) : user.friends && user.friends.includes(user_id) ? (
                    <GroupIcon color="primary" />
                  ) : (
                    <Button
                      disabled={user.pending_friends
                        .map(({ id }) => id)
                        .includes(user_id)}
                      variant="contained"
                      onClick={() => requestFriend()}
                      startIcon={<PersonAddIcon />}
                      color="primary"
                    >
                      {user.pending_friends
                        .map(({ id }) => id)
                        .includes(user_id)
                        ? "Request Sent"
                        : "Add Friend"}
                    </Button>
                  ))}
              </Grid>
            </Grid>
          </div>
        </Card>
      </Window>
      <UserActivity
        userId={user_id}
        attending={otherUser.attending}
        friends={otherUser.rich_friends}
        incoming={otherUser.incoming_friends || []}
        respondToReq={i => respondToReq(i)}
      />
    </ContentPage>
  ) : (
    <span />
  );
};
