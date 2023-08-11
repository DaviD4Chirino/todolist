"use client";
import "./sass/project.sass";
import {
  BiSolidChevronDown as DownArrow,
  BiSolidChevronUp as UpArrow,
} from "react-icons/bi";
import { IconButton, Collapse, Tooltip, useMediaQuery } from "@mui/material";
import Checkbox from "@/components/Checkbox";
import TitleEditable from "@/components/TitleEditable";
import Step from "./Step";
import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import { useState } from "react";
import CreateProjectButton from "@/components/CreateProjectButton";
import { motion, AnimatePresence, MotionProps } from "framer-motion";
export default function Project({
  project,
  folderId,
  homeFunctions,
  key,
  ...MotionProps
}: {
  project: Project;
  folderId: number;
  homeFunctions: homeFunctions;
  transitionPosition?: any;
  key?: any;
} & MotionProps) {
  const [open, setOpen] = useState(true);
  function toggle() {
    setOpen(!open);
  }
  return (
    <motion.li
      key={key}
      className="project"
      initial={{
        x: -100,
        opacity: 0,
        height: 0,
      }}
      animate={{
        x: 0,
        height: "auto",
        opacity: 1,
      }}
      exit={{
        position: "relative",
        x: 100,
        height: 0,
        opacity: 0,
      }}
      {...MotionProps}
    >
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
        <Icons
          folderId={folderId}
          homeFunctions={homeFunctions}
          project={project}
          toggle={toggle}
          open={open}
        />
      </header>
      <Collapse in={open}>
        <ul className="list-unset content">
          <AnimatePresence>
            {project.steps.map((step) => (
              <Step key={step.id} step={step} homeFunctions={homeFunctions} />
            ))}
            {project.projects.map((project) => (
              <Project
                key={project.id}
                folderId={folderId}
                project={project}
                homeFunctions={homeFunctions}
              />
            ))}
          </AnimatePresence>
        </ul>
      </Collapse>
    </motion.li>
  );
}
import React from "react";
import MobileMenu from "@/components/MobileMenu";

function Icons({
  folderId,
  homeFunctions,
  project,
  toggle,
  open,
}: {
  folderId: number;
  homeFunctions: homeFunctions;
  project: Project;
  toggle: () => void;
  open: boolean;
}) {
  const mobile = useMediaQuery("(max-width: 600px)");
  if (mobile) {
    return (
      <>
        <MobileMenu
          homeFunctions={homeFunctions}
          createAndDelete="project"
          id={project.id}
          folderId={folderId}
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
      </>
    );
  }
  return (
    <>
      <CreateProjectButton id={folderId} homeFunctions={homeFunctions} />

      <CreateButton
        create="step"
        id={project.id}
        homeFunctions={homeFunctions}
      />
      <DeleteButton
        delete="project"
        id={project.id}
        homeFunctions={homeFunctions}
      />
      <Tooltip title="Collapse this project">
        <IconButton
          aria-label="move"
          className="justify-self-end"
          onClick={toggle}
        >
          {open ? <UpArrow className="icon" /> : <DownArrow className="icon" />}
        </IconButton>
      </Tooltip>
    </>
  );
}
