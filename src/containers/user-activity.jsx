import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import Badge from "@material-ui/core/Badge";
import Window from "../components/window-95";
import { aFetch } from "../hooks/auth-user";
import Link from "../components/styled-link";

const useStyles = makeStyles(theme => ({
  cardRoot: {
    display: "flex",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 170
  },
  spacedWindow: {
    marginTop: "50px"
  }
}));

const PostView = ({ id, title, pic, address }) => {
  const classes = useStyles();
  return (
    <Link to={`/host-post/${id}`}>
      <Card className={classes.cardRoot}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1">
              {format(new Date(Date.now()), "MMM do h:mma")}
            </Typography>
            <Typography variant="subtitle1">{address}</Typography>
          </CardContent>
        </div>
        <CardMedia className={classes.cover} image={pic} />
      </Card>
    </Link>
  );
};

const TabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && children}
  </div>
);

export default ({ userId, friends, attending, incoming, respondToReq }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(
    () => {
      const req = async () => {
        const { data } = await aFetch(`/api/host-post?user_id=${userId}`);
        setPosts(data);
      };
      req();
    },
    [userId]
  );

  return (
    <Window className={classes.spacedWindow} title={`User Activity`}>
      <Paper square>
        <Tabs
          value={value}
          onChange={(_, value) => setValue(value)}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<HomeOutlinedIcon />} label="HOST POSTS" />
          <Tab icon={<FastfoodOutlinedIcon />} label="ATTENDED" />
          <Tab icon={<RestaurantMenuIcon />} label="UPCOMING" />
          <Tab
            icon={
              <Badge
                badgeContent={
                  incoming.length ? `+${incoming.length}` : undefined
                }
                color="primary"
              >
                <PeopleOutlineIcon />
              </Badge>
            }
            label={`FRIENDS(${friends ? friends.length : 0})`}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          {posts.map(p => <PostView key={p.id} {...p} />)}
        </TabPanel>
        <TabPanel value={value} index={1} />
        <TabPanel value={value} index={2}>
          {attending && attending.map(p => <PostView key={p.id} {...p} />)}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {incoming &&
            incoming.map(({ id, pic, full_name, user_name }) => (
              <CardHeader
                key={id}
                avatar={<Avatar alt={full_name} src={pic} />}
                title={full_name}
                subheader={<Link to={`/profile/${id}`}>@{user_name}</Link>}
                action={
                  <React.Fragment>
                    <Button
                      variant="contained"
                      onClick={() => respondToReq({ id, val: true })}
                      startIcon={<PersonAddIcon />}
                      color="primary"
                    >
                      Accept Friend
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => respondToReq({ id, val: false })}
                      startIcon={<PersonAddDisabledIcon />}
                      color="secondary"
                    >
                      Reject Friend
                    </Button>
                  </React.Fragment>
                }
              />
            ))}
          {friends &&
            friends.map(({ id, pic, full_name, user_name }) => (
              <CardHeader
                key={id}
                avatar={<Avatar alt={full_name} src={pic} />}
                title={full_name}
                subheader={<Link to={`/profile/${id}`}>@{user_name}</Link>}
              />
            ))}
        </TabPanel>
      </Paper>
    </Window>
  );
};
