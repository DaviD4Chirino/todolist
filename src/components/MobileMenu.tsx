import { IconButton, Menu, MenuItem } from "@mui/material";

import React, { useState } from "react";
import { CgMoreVerticalO as MoreI } from "react-icons/cg";
import CreateButton from "./CreateButton";
import DeleteButton from "./DeleteButton";
import CreateProjectButton from "./CreateProjectButton";

export default function MobileMenu({
  homeFunctions,
  createAndDelete,

  folderId,
  id,
}: {
  homeFunctions: homeFunctions;
  createAndDelete: "project" | "folder" | "step";
  /**It only uses it on Project */
  folderId?: number;
  id: number;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mobile-menu">
      <IconButton
        className="mobile-menu__button"
        onClick={handleClick}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
      >
        <MoreI className="icon" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <CreateButton create="step" id={id} homeFunctions={homeFunctions} />
        </MenuItem>
        <MenuItem>
          {createAndDelete === "project" && (
            <CreateProjectButton
              id={folderId as number}
              homeFunctions={homeFunctions}
            />
          )}
        </MenuItem>
        <MenuItem>
          <DeleteButton
            delete="project"
            id={id}
            homeFunctions={homeFunctions}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
