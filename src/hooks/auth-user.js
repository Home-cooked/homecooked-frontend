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

const authContext = createContext();

export const useAuthUser = () => useContext(authContext);

const useProvideUser = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const req = async () => {
      const { data } = await aFetch("/api/users/self");
      setUser(data);
    };
    req();
  }, []);

  return [user, setUser];
};

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
  localStorage.setItem("token", token);
  return <Redirect to="/complete-signup" />;
};
