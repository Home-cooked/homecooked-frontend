import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
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
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Window from "../components/window-95";
import { aFetch, useAuthUser } from "../hooks/auth-user";
import { MessageList } from "../components/messages";
import EatRequestForm from "../components/eat-request-popup-form";
import AdditionalAction, {
  AdditionalActionItem
} from "../components/additional-action";
import HostPostRespondList from "../components/host-post-respond-list";
import ProfilesModal from "../components/profiles-modal";
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
  postWindow: {
    width: 800
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
  const { user, setUser } = useAuthUser();

  useEffect(
    () => {
      const req = async () => {
        const { data } = await aFetch(
          `api/host-post/${host_post_id}?user=true&comments=true&submit_groups=true`
        );
        setPost(data);
      };
      req();
    },
    [host_post_id]
  );

  const submitGroup = async ({ users, note }) => {
    const {
      data: { submit_groups, pending_groups }
    } = await aFetch(`/api/host-post/${post.id}/submit-group`, {
      method: "POST",
      body: JSON.stringify({
        users,
        note
      })
    });
    setPost({
      ...post,
      submit_groups,
      pending_groups
    });
  };

  const respondToGroup = async (groupId, val) => {
    const {
      data: { submit_groups, pending_groups }
    } = await aFetch(`/api/host-post/${host_post_id}/respond-to-group`, {
      method: "POST",
      body: JSON.stringify({ val, submit_group_id: groupId })
    });
    setPost({
      ...post,
      submit_groups,
      pending_groups
    });
  };

  const makeComment = async message => {
    const { data } = await aFetch(`/api/comments/host-post`, {
      method: "POST",
      body: JSON.stringify({ message, host_post_id })
    });
    setPost({
      ...post,
      comments: [...post.comments, data]
    });
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
                <Grid item xs={10}>
                  <Typography component="h4" variant="h4">
                    {post && post.title}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
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
                {post ? (
                  <Link to={`/profile/${post.user.id}`}>
                    <Grid item container>
                      <Grid item>
                        {post.user.pic && (
                          <Avatar
                            alt={post.user.full_name}
                            src={post.user.pic}
                            className={classes.smallAvatar}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        @{post.user.user_name} - {post.user.full_name}
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

              <ProfilesModal
                title={"Coming"}
                people={[
                  ...(post ? [post.user] : []),
                  ...(post && post.attending ? post.attending : [])
                ]}
              />

              <ProfilesModal
                title={"Pending"}
                people={
                  post
                    ? post.submit_groups.reduce(
                        (acc, { users }) => acc.concat(users),
                        []
                      )
                    : []
                }
              />

              <Typography variant="subtitle1">
                Spots remaining: {post && post.max_size}
              </Typography>
              <Typography variant="body1">{post && post.body}</Typography>
            </CardContent>
            <Grid container justify="flex-end" className={classes.quickActions}>
              <Grid item>
                {post &&
                  post.user_id !== user.id && (
                    <EatRequestForm
                      disabled={post.submit_groups
                        .flatMap(({ users }) => users)
                        .find(({ id }) => id == user.id)}
                      friends={user.rich_friends}
                      onSubmit={submitGroup}
                    />
                  )}
              </Grid>
              <Grid item>
                {post &&
                  post.user_id == user.id && (
                    <HostPostRespondList
                      disabled={post.submit_groups.length == 0}
                      submitGroups={post.submit_groups}
                      respondToGroup={(id, t) => respondToGroup(id, t)}
                      setPost={setPost}
                    />
                  )}
              </Grid>
            </Grid>
          </div>
        </Card>
      </Window>
      <MessageList
        messages={post ? post.comments : []}
        onSubmit={message => makeComment(message)}
      />
    </ContentPage>
  );
};
