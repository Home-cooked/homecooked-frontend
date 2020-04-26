import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { DropzoneDialog } from "material-ui-dropzone";

export default () => {
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <React.Fragment>
      <Box
        border={1}
        borderColor="text.main"
        bgcolor="background.paper"
        borderRadius={5}
        style={{ width: "18rem", height: "18rem" }}
        onClick={() => {
          console.log("box click");
          setOpen(true);
        }}
      />
      <DropzoneDialog
        acceptedFiles={["image/*"]}
        cancelButtonText={"Cancel"}
        submitButtonText={"Submit"}
        maxFileSize={5000000}
        open={open}
        onClick={e => e.stopPropagation()}
        onClose={() => setOpen(false)}
        onSave={files => {
          console.log("Files:", files);
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </React.Fragment>
  );
};
