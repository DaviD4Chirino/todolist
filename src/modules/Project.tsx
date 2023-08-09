"use client";
import "./sass/project.sass";
import {
  BiSolidChevronDown as DownArrow,
  BiSolidChevronUp as UpArrow,
} from "react-icons/bi";
import { IconButton, Collapse, Tooltip } from "@mui/material";
import Checkbox from "@/components/Checkbox";
import TitleEditable from "@/components/TitleEditable";
import Step from "./Step";
import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import { useState } from "react";
export default function Project({
  project,
  homeFunctions,
  ...props
}: {
  project: Project;
  homeFunctions: homeFunctions;
  props?: any;
}) {
  const [open, setOpen] = useState(true);
  function toggle() {
    setOpen(!open);
  }
  return (
    <li className="project" {...props}>
      <header className="flex align-items-center">
        <Checkbox
          id={project.id}
          homeFunctions={homeFunctions}
          owner="project"
        />
        <TitleEditable
          owner="project"
          id={project.id}
          name={project.name}
          homeFunctions={homeFunctions}
          heading="h2"
        />
        <DeleteButton
          delete="project"
          id={project.id}
          homeFunctions={homeFunctions}
        />
        <CreateButton
          create="step"
          id={project.id}
          homeFunctions={homeFunctions}
        />
        <Tooltip title="Collapse this project">
          <IconButton
            aria-label="move"
            className="justify-self-end"
            onClick={toggle}
          >
            {open ? (
              <UpArrow className="icon" />
            ) : (
              <DownArrow className="icon" />
            )}
          </IconButton>
        </Tooltip>
      </header>
      <Collapse in={open}>
        <ul className="list-unset content">
          {project.steps.map((step, id) => (
            <Step key={step.id} step={step} homeFunctions={homeFunctions} />
          ))}
        </ul>
      </Collapse>
    </li>
  );
}
