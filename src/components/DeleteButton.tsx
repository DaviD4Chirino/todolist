"use client";
import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import { AiFillDelete as DeleteI } from "react-icons/ai";
import { ConfirmProvider, useConfirm } from "material-ui-confirm";

export default function DeleteButton({
  delete: deleteType,
  id,
  homeFunctions,
}: {
  delete: "folder" | "project" | "step";
  id: number;
  homeFunctions: homeFunctions;
}) {
  const confirm = useConfirm();
  function handleDeleteByType() {
    switch (deleteType) {
      case "folder":
        homeFunctions.deleteFolderById(id);
        break;
      case "project":
        homeFunctions.deleteProjectById(id);
        break;
      case "step":
        homeFunctions.deleteStepById(id);
        break;
      default:
        break;
    }
  }

  function handleDelete() {
    confirm({
      description: `Are you sure you want to delete this ${deleteType}?`,
      title: "",
    })
      .then(handleDeleteByType)
      .catch(() => console.log("Deletion cancelled."));
  }
  return (
    <Tooltip title={`Delete ${deleteType}`}>
      <IconButton
        aria-label={`delete ${deleteType}`}
        onClick={handleDelete}
        color="warning"
      >
        <DeleteI className="icon" />
      </IconButton>
    </Tooltip>
  );
}
