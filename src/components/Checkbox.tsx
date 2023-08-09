import React, { useState } from "react";
import { Checkbox as MuiCheckbox } from "@mui/material";
export default function Checkbox({
  id,
  homeFunctions,
  owner,
}: {
  id: number;
  homeFunctions: homeFunctions;
  owner: "folder" | "project" | "step";
}) {
  function checkIsDoneByOwner() {
    switch (owner) {
      case "folder":
        return homeFunctions.isFolderDone(id);
      case "project":
        return homeFunctions.isProjectDone(id);
      case "step":
        return homeFunctions.isStepDone(id);
      default:
        return false;
    }
  }
  function updateDoneByOwner() {
    switch (owner) {
      case "folder":
        homeFunctions.setFolderAsDone(id, !done);
        break;
      case "project":
        homeFunctions.setProjectAsDone(id, !done);
        break;
      case "step":
        homeFunctions.setStepAsDone(id, !done);
        break;
      default:
        break;
    }
  }
  const [done, setDone] = useState(checkIsDoneByOwner());
  function handleChange() {
    setDone(!done);
    updateDoneByOwner();
  }

  return <MuiCheckbox checked={done} onChange={handleChange} />;
}
