import React from "react";
import { styled } from "@material-ui/core/styles";

export default ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginTop: "15vh",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        maxWidth: "800px"
      }}
    >
      {children}
    </div>    
  </div>
);
