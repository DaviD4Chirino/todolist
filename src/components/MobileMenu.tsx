import { IconButton, Menu, MenuItem } from "@mui/material";

import React, { useState } from "react";
import { CgMoreVerticalO as MoreI } from "react-icons/cg";
import CreateButton from "./CreateButton";
import DeleteButton from "./DeleteButton";
import CreateProjectButton from "./CreateProjectButton";

export default function MobileMenu(props: {
  homeFunctions: homeFunctions;
  create: "project" | "folder" | "step";
  delete: "project" | "folder" | "step";
  /**It only uses it on Project */
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
          <CreateButton
            create={props.create}
            id={props.id}
            homeFunctions={props.homeFunctions}
          />
        </MenuItem>

        <MenuItem>
          <DeleteButton
            delete={props.delete}
            id={props.id}
            homeFunctions={props.homeFunctions}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
