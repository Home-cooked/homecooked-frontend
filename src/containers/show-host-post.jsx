import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Paper from "@material-ui/core/Paper";
import ContentPage from "../components/content-page";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardGallery from "../components/card-gallery";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import Window from "../components/window-95";
import { aFetch, useAuthUser } from "../hooks/auth-user";
import { MessageList } from "../components/messages";
import EatRequestForm from "../components/eat-request-popup-form";
import AdditionalAction, {
  AdditionalActionItem
} from "../components/additional-action";
import HostPostRespondList from "../components/host-post-respond-list";

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
  postWindow: {
    width: 700
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: "5px"
  },
  quickActions: {
    padding: "15px"
  }
}));

export default () => {
  const classes = useStyles();
  const { host_post_id } = useParams();
  const [post, setPost] = useState(undefined);
  const [hostUser, setHostUser] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const { user, setUser } = useAuthUser();

  useEffect(
    () => {
      const req = async () => {
        const { data } = await aFetch(`api/host-post/${host_post_id}`);
        setPost(data);
      };
      req();
    },
    [host_post_id]
  );

  useEffect(
    () => {
      const req = async () => {
        const { data } = await aFetch(
          `api/comments/host-post?host_post_id=${host_post_id}`
        );
        setComments(data);
      };
      req();
    },
    [host_post_id]
  );

  useEffect(
    () => {
      const req = async () => {
        const { data } = await aFetch(`api/users/${post.user_id}`);
        setHostUser(data);
      };

      if (post) {
        req();
      }
    },
    [post]
  );

  const submitGroup = async ({ users, note }) => {
    const data = await aFetch(`api/host-post/${post.id}/submit-group`, {
      method: "POST",
      body: JSON.stringify({
        users,
        note
      })
    });
  };

  const makeComment = async message => {
    const { data } = await aFetch(`api/comments/host-post`, {
      method: "POST",
      body: JSON.stringify({ message, host_post_id })
    });
    setComments([...comments, data]);
  };

  return (
    <ContentPage>
      <Window
        className={classes.postWindow}
        title={`Host Post - SN:${host_post_id}`}
      >
        <Card className={classes.cardRoot}>
          <CardMedia className={classes.cover} image={post && post.pic} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Typography component="h4" variant="h4">
                    {post && post.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <AdditionalAction>
                    <AdditionalActionItem
                      label="Perons Action"
                      onClick={() => console.log("hey")}
                      icon={<PersonIcon />}
                    />
                  </AdditionalAction>
                </Grid>
              </Grid>
              <Typography variant="subtitle2">
                {hostUser ? (
                  <Link to={`/profile/${hostUser.id}`}>
                    <Grid item container>
                      <Grid item>
                        {hostUser.pic ? (
                          <Avatar
                            src={hostUser.pic}
                            className={classes.smallAvatar}
                          />
                        ) : (
                          <Avatar className={classes.smallAvatar}>
                            {hostUser.full_name[0]}
                          </Avatar>
                        )}
                      </Grid>
                      <Grid item>
                        @{hostUser.user_name} - {hostUser.full_name}
                      </Grid>
                    </Grid>
                  </Link>
                ) : (
                  "**loading**"
                )}
              </Typography>

              <Typography variant="subtitle2">
                {format(new Date(Date.now()), "MMM do h:mma")}
              </Typography>
              <Typography variant="subtitle1">
                Spots remaining: {post && post.max_size}
              </Typography>
              <Typography variant="body1">{post && post.body}</Typography>
            </CardContent>
            <Grid container justify="flex-end" className={classes.quickActions}>
              <Grid item>
                <EatRequestForm
                  friends={user.rich_friends}
                  onSubmit={submitGroup}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </Window>
      <MessageList
        messages={comments}
        onSubmit={message => makeComment(message)}
      />
      {post && <HostPostRespondList submitGroups={post.submit_groups} />}
    </ContentPage>
  );
};
