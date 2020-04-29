import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ContentPage from "../components/content-page";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardGallery from "../components/card-gallery";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import Window from "../components/window-95";
import { aFetch } from "../hooks/auth-user";

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
  const { host_post_id } = useParams();
  const [post, setPost] = useState(undefined);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const req = async () => {
      const { data } = await aFetch(`api/host-post/${host_post_id}`);
      setPost(data);
    };
    req();
  }, []);

  useEffect(
    () => {
      const req = async () => {
        const { data } = await aFetch(`api/users/${post.user_id}`);
        setUser(data);
      };

      if (post) {
        req();
      }
    },
    [post]
  );

  return (
    <ContentPage>
      <Window title={`Host Post - SN:${host_post_id}`}>
        <Card className={classes.cardRoot}>
          <CardMedia className={classes.cover} image={post && post.pic} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h4" variant="h4">
                {post && post.title}
              </Typography>
              <Typography variant="subtitle2">
                {user ? (
                  <Link to={`/profile/${user.id}`}>
                    @{user.user_name} - {user.full_name}
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
          </div>
        </Card>
      </Window>
    </ContentPage>
  );
};
