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
import Window from "../components/window-95";
import UserActivity from "../containers/user-activity";
import { aFetch, useAuthUser } from "../hooks/auth-user";

const useStyles = makeStyles(theme => ({
  cardRoot: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    height: 200,
    width: 200
  }
}));

export default () => {
  const classes = useStyles();
  const { user_id } = useParams();
  const [otherUser, setOtherUser] = useState(undefined);
  const { user, setUser } = useAuthUser();

  useEffect(() => {
    const req = async () => {
      const { data } = await aFetch(`api/users/${user_id}`);
      setOtherUser(data);
    };
    req();
  }, []);

  const friend = async () => {
    const { data } = await aFetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          friends: user.friends
            ? [...user.friends, otherUser.id]
            : [otherUser.id]
        }
      })
    });

    setUser(data);
  };

  return otherUser ? (
    <ContentPage>
      <Window title={`EnterPrized™ Customer - ${otherUser.full_name}`}>
        <Card className={classes.cardRoot}>
          <CardMedia className={classes.cover} image={otherUser.pic} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h4" variant="h4">
                {otherUser.full_name}
              </Typography>
              <Typography variant="subtitle2">
                @{otherUser.user_name}
              </Typography>
              <Typography variant="subtitle2">
                Member since:{" "}
                {format(new Date(otherUser.created_at), "MMM do h:mma")}
              </Typography>
              <Typography variant="body1">{otherUser.about_me}</Typography>
            </CardContent>
            <Button onClick={() => friend()}>+Friend</Button>
          </div>
        </Card>
      </Window>
      <UserActivity userId={user_id} friends={otherUser && otherUser.friends} />
    </ContentPage>
  ) : (
    <span />
  );
};
