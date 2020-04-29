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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Window from "../components/window-95";
import { aFetch } from "../hooks/auth-user";

const useStyles = makeStyles(theme => ({
  cardRoot: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "350px"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  spacedWindow: {
    marginTop: "50px"
  }
}));

const PostView = ({ title, pic, address }) => {
  const classes = useStyles();
  return (
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
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

export default ({ userId, friends }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const req = async () => {
      const { data } = await aFetch(`api/host-post?user_id=${userId}`);
      setPosts(data);
    };
    req();
  }, []);

  return (
    <Window className={classes.spacedWindow} title={`User Activity`}>
      <Paper square>
        <Tabs
          value={value}
          onChange={(_, value) => setValue(value)}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<HomeOutlinedIcon />} label="HOST POSTS" />
          <Tab icon={<FastfoodOutlinedIcon />} label="ATTENDED" />
          <Tab
            icon={<PeopleOutlineIcon />}
            label={`FRIENDS(${friends ? friends.length : 0})`}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          {posts.map(p => <PostView key={p.id} {...p} />)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Pathetic. None yet
        </TabPanel>
        <TabPanel value={value} index={2}>
          {friends &&
            friends.map(f => (
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    F
                  </Avatar>
                }
                title="Friend name"
                /* subheader="September 14, 2016" */
              />
            ))}
        </TabPanel>
      </Paper>
    </Window>
  );
};
