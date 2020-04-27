import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { DropzoneDialog } from "material-ui-dropzone";
import CardMedia from "@material-ui/core/CardMedia";
import useFileReader from "../hooks/file-reader";

export default ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [picCount, setPicCount] = useState(0);
  const [displayB64, setDisplayB64] = useState(undefined);
  const [{ result }, setFile] = useFileReader();

  return (
    <React.Fragment>
      <Box
        border={1}
        borderColor="primary"
        bgcolor="background.paper"
        borderRadius={5}
        style={{ width: "18rem", height: "18rem" }}
        onClick={() => setOpen(true)}
      >
        {result ? (
          <Badge
            badgeContent={picCount}
            style={{ height: "100%", width: "100%" }}
            color="primary"
          >
            <CardMedia
              title="Pictures"
              style={{ height: "100%", width: "100%" }}
              image={result || "#"}
            />
          </Badge>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <AddAPhotoOutlinedIcon style={{ fontSize: 70 }} color="primary" />
          </div>
        )}
      </Box>
      <DropzoneDialog
        acceptedFiles={["image/*"]}
        cancelButtonText={"Cancel"}
        submitButtonText={"Submit"}
        maxFileSize={5000000}
        open={open}
        onClick={e => e.stopPropagation()}
        onClose={() => setOpen(false)}
        onSave={files => {
          setFile(files[0]);
          setPicCount(files.length);
          onChange(files);
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </React.Fragment>
  );
};
