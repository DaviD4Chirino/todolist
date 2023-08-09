"use client";
import { IconButton, Tooltip } from "@mui/material";
import { AiFillPlusCircle as PlusI } from "react-icons/ai";

export default function CreateButton(props: {
  create: "folder" | "project" | "step";
  /**
   * @param id
   * * if create is "folder", id is not used
   * * If create is "project", id is the folder id
   * * If create is "step", id is the project id
   */
  id: number;
  homeFunctions: homeFunctions;
  name?: string;
}) {
  function handleCreateFolder() {
    switch (props.create) {
      case "folder":
        props.homeFunctions.createNewFolder(props.name);
        break;
      case "project":
        props.homeFunctions.createNewProject(props.id, props.name);
        break;
      case "step":
        props.homeFunctions.createNewStep(props.id, props.name);
        break;
      default:
        return null;
    }
  }

  return (
    <Tooltip title={`Create a new ${props.create}`}>
      <IconButton
        aria-label={`add ${props.create}`}
        onClick={handleCreateFolder}
        color="success"
      >
        <PlusI className="icon" />
      </IconButton>
    </Tooltip>
  );
}
{
  /* <IconButton aria-label="add folder" onClick={handleCreateFolder}>
  <PlusI className="icon" />
</IconButton>; */
}
