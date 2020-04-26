import React from "react";
import { styled } from '@material-ui/core/styles';
import MySpeedDial from "./speed-dial";

export default ({children}) => (
  <div style={{
    background:"#008080",
    display:"inline-block",
    textAlign:"center",
    width:"100%",
    height:"100%",
    paddingTop:"20vh"
  }}>
    {children}
    <MySpeedDial/>
  </div>
)
