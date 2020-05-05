import React, { useState, useEffect, useContext, createContext } from "react";
import { useParams, Redirect } from "react-router-dom";

document.domain = process.env.TOP_LEVEL_DOMAIN || document.domain;

let token = localStorage.getItem("token");

export const aFetch = async (
  url,
  { headers, noContent = false, ...body } = {}
) => {
  let rich_url = `${process.env.SERVER_DOMAIN || ''}${url[0] == '/' ? url : `/${url}`}`;
  return await (await fetch(rich_url, {
    ...body,
    headers: {
      ...(noContent ? {} : { "Content-Type": "application/json" }),
      ...(headers || {}),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })).json();
};

const useProvideUser = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const req = async () => {
      const data = await aFetch("/api/users/self");
      setLoading(false);
      setUser(data);
    };
    if(token){
      req();
    }else{
      setLoading(false);
    }
  }, []);

  return [user, loading, setUser];
};

const authContext = createContext();

export const useAuthUser = () => useContext(authContext);

export const ProvideAuthUser = ({ children }) => {
  const [user, loading, setUser] = useProvideUser();
  return (
    <authContext.Provider value={{ user, loading, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export const ParseLoginCallbackRoute = () => {
  const { token } = useParams();
  const {user, setUser} = useAuthUser();
  
  localStorage.setItem("token", token);
  useEffect(() => {
    let mounted = true;
    const req = async () => {
      const data = await aFetch("/api/users/self");
      setUser(data); 
      if(mounted){
        setUser(data); 
      }
    };
    req();
    return () => mounted = false;
  }, []);
  return !!user
    ? user.pic  ? <Redirect to="/map" /> : <Redirect to="/profile/edit" />
    : <span/>;
};
