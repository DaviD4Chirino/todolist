"use client";
import React from "react";
import { Menu, MenuItem } from "@mui/material";

type props = {
  buttonRender: React.ReactNode;
};
export default function MenuCreate() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return <div>MenuCreate</div>;
}
