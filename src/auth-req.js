import React from "react";
import { Route, Redirect, useParams } from "react-router-dom";

let token = localStorage.getItem("token");
let signedIn = false;
export let User = {};
export const isAuthenticated = () => {
  let inProgress = false;
  return inProgress
    ? () => signedIn
    : history => {
        // If empty user and not signed in, load from token and push history
        if (!signedIn && Object.keys(User).length === 0 && token) {
          // need to address expired tokens
          inProgress = true;
          grab_user_from_token().then(_ => history.push("/"));
        }
        return signedIn;
      };
};
export const setUser = newUser => (User = newUser);

const aFetch = async (url, { headers, noContent = false, ...body } = {}) => {
  if (typeof url == "function") {
    url = url(User);
  }
  return await (await fetch(url, {
    ...body,
    headers: {
      ...(noContent ? {} : { "Content-Type": "application/json" }),
      ...(headers || {}),
      Authorization: `Bearer ${token}`
    }
  })).json();
};

export default aFetch;

const grab_user_from_token = async () => {
  const { data } = await aFetch("/api/users/self");
  User = data;
  signedIn = true;
};

export const ParseLoginCallbackRoute = () => {
  const params = useParams();
  token = params.token;
  localStorage.setItem("token", token);
  grab_user_from_token();
  signedIn = true;
  return <Redirect to="/complete-signup" />;
};
