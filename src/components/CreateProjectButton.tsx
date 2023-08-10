"use client";
import React from "react";

import { IconButton, Tooltip } from "@mui/material";
import { AiFillFileAdd as FileI } from "react-icons/ai";

export default function CreateButton(props: {
  id: number;
  homeFunctions: homeFunctions;
  name?: string;
}) {
  function handleCreateFolder() {
    props.homeFunctions.createNewProject(props.id, props.name);
  }

  return (
    <Tooltip title="Add project">
      <IconButton
        aria-label="add project"
        onClick={handleCreateFolder}
        color="success"
      >
        <FileI className="icon" />
      </IconButton>
    </Tooltip>
  );
}
