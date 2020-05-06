import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CardMedia from "@material-ui/core/CardMedia";
import Badge from "@material-ui/core/Badge";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import useFileReader from "../hooks/file-reader";

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: "white",
    top: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      opacity: "0.83"
    }
  },
  activated: {
    opacity: "0.7"
  },
  disabled: {
    opacity: "0.3"
  },
  right: {
    right: "6px"
  },
  left: {
    left: "6px"
  }
}));

export default ({ pictures }) => {
  const [idx, setIdx] = useState(null);
  const [{ result }, setFile] = useFileReader();
  const classes = useStyles();

  useEffect(
    () => {
      setIdx(pictures.length ? 0 : null);
    },
    [pictures]
  );

  useEffect(
    () => {
      if (idx !== null && typeof pictures[idx] !== "string") {
        setFile(pictures[idx]);
      }
    },
    [idx, pictures]
  );

  const link = pictures.length
    ? typeof pictures[idx] == "string"
      ? pictures[idx]
      : result
    : "#";

  return (
    <Badge
      badgeContent={pictures.length}
      style={{ height: "100%", width: "100%" }}
      color="primary"
    >
      <CardMedia
        title="Pictures"
        style={{ height: "100%", width: "100%" }}
        image={link}
      >
        <IconButton
          size="small"
          className={clsx(
            idx > 0 ? classes.activated : classes.disabled,
            classes.button,
            classes.left
          )}
          disabled={idx == 0}
          onClick={e => {
            e.stopPropagation();
            setIdx(idx - 1);
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          size="small"
          className={clsx(
            idx < pictures.length - 1 ? classes.activated : classes.disabled,
            classes.button,
            classes.right
          )}
          disabled={idx == pictures.length - 1}
          onClick={e => {
            e.stopPropagation();
            setIdx(idx + 1);
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </CardMedia>
    </Badge>
  );
};
