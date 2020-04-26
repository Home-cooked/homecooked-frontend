import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import TabPanel from "../components/tab-panel";
import Window from "../components/window-95";
import ContentPage from "../components/content-page";

const googleSignUp = async () => {
  const resp = await fetch("/auth/google", {
    "Content-Type": "application/json",
    redirect: "manual"
  });
  window.location.href = resp.url;
};

const Icon = ({ network }) => (
  <SocialIcon
    network={network}
    style={{ cursor: "pointer" }}
    onClick={() => googleSignUp()}
  />
);

export default () => {
  const [value, setValue] = useState(0);
  return (
    <ContentPage>
      <Window title="Digital Portal Enterprise Access">
        <Paper square>
          <Tabs value={value} onChange={(_, new_value) => setValue(new_value)}>
            <Tab label="login" />
            <Tab label="sign up" />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <Icon network="google" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Icon network="google" />
        </TabPanel>
      </Window>
    </ContentPage>
  );
};
