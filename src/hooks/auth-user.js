import React, { useState, useEffect, useContext, createContext } from "react";
import { useParams, Redirect } from "react-router-dom";

let token = localStorage.getItem("token");

export const aFetch = async (
  url,
  { headers, noContent = false, ...body } = {}
) => {
  if (typeof url == "function") {
    url = url(User);
  }
  return await (await fetch(url, {
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

  useEffect(() => {
    const req = async () => {
      const data = await aFetch("/api/users/self");
      setUser(data);
    };
    if(token){
      req();
    }
  }, []);

  return [user, setUser];
};

const authContext = createContext();

export const useAuthUser = () => useContext(authContext);

export const ProvideAuthUser = ({ children }) => {
  const [user, setUser] = useProvideUser();
  return (
    <authContext.Provider value={{ user, setUser }}>
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
