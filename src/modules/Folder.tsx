"use client";
import "./sass/folder.sass";
import {
  BiSolidChevronDown as DownArrow,
  BiSolidChevronUp as UpArrow,
} from "react-icons/bi";
import { IconButton, Collapse, Tooltip } from "@mui/material";

import CreateButton from "@/components/CreateButton";
import Checkbox from "@/components/Checkbox";
import Project from "./Project";
import TitleEditable from "@/components/TitleEditable";
import DeleteButton from "@/components/DeleteButton";
import { useState } from "react";
export default function Folder({
  projects,
  name,
  id,
  homeFunctions,
  ...props
}: {
  projects: Project[];
  name: string;
  id: number;
  homeFunctions: homeFunctions;
  props?: any;
}) {
  const [open, setOpen] = useState(true);
  function toggle() {
    setOpen(!open);
  }

  return (
    <section className="folder" {...props}>
      <header
        role="button"
        className="flex justify-content-between align-items-center"
      >
        <Checkbox id={id} homeFunctions={homeFunctions} owner="folder" />
        <TitleEditable
          owner="folder"
          name={name}
          id={id}
          homeFunctions={homeFunctions}
          heading="h1"
        />
        <CreateButton create="project" id={id} homeFunctions={homeFunctions} />
        <DeleteButton delete="folder" id={id} homeFunctions={homeFunctions} />
        <Tooltip title="Collapse this folder">
          <IconButton aria-label="collapse" onClick={toggle}>
            {open ? <UpArrow /> : <DownArrow />}
          </IconButton>
        </Tooltip>
      </header>
      <Collapse in={open}>
        <ul className="list-unset content">
          {projects.map((project) => (
            <Project
              key={project.id}
              folderId={id}
              project={project}
              homeFunctions={homeFunctions}
            />
          ))}
        </ul>
      </Collapse>
    </section>
  );
}
