import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { DropzoneDialog } from "material-ui-dropzone";
import CardGallery from "./card-gallery";

export default ({ onChange, filesLimit = 4 }) => {
  const [open, setOpen] = useState(false);
  const [picCount, setPicCount] = useState(0);
  const [displayB64, setDisplayB64] = useState(undefined);
  const [files, setFiles] = useState([]);

  return (
    <React.Fragment>
      <Box
        border={1}
        borderColor="secondary.main"
        borderRadius={5}
        onClick={() => setOpen(true)}
      >
        {files.length ? (
          <CardGallery pictures={files} />
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
        filesLimit={filesLimit}
        onSave={files => {
          setPicCount(files.length);
          onChange(files);
          setOpen(false);
          setFiles(files);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </React.Fragment>
  );
};
