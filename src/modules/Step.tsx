"use client";
import "./sass/step.sass";
import "react-quill/dist/quill.bubble.css";
import Editor from "react-quill";
import { Collapse, Divider, IconButton, Tooltip } from "@mui/material";
import {
  BiSolidChevronDown as DownArrow,
  BiSolidChevronUp as UpArrow,
} from "react-icons/bi";
import Checkbox from "@/components/Checkbox";
import TitleEditable from "@/components/TitleEditable";
import React, { useState } from "react";
import DeleteButton from "@/components/DeleteButton";
import { motion } from "framer-motion";
export default function Step({
  step,
  homeFunctions,
  ...props
}: {
  step: Step;
  homeFunctions: homeFunctions;
  props?: any;
}) {
  const [value, setValue] = useState(step.content || "");
  const [open, setOpen] = useState(true);
  function toggle() {
    setOpen(!open);
  }
  const handleValueChange = (newValue: any) => {
    setValue(newValue);
    homeFunctions.updateStepContent(step.id, newValue);
    console.log(newValue);
  };
  return (
    <motion.li
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
      className="step"
      {...props}
    >
      <header className="flex align-items-center" role="button">
        <Checkbox owner="step" id={step.id} homeFunctions={homeFunctions} />
        <TitleEditable
          owner="step"
          id={step.id}
          name={step.name}
          homeFunctions={homeFunctions}
          heading="h3"
        />
        <DeleteButton
          delete="step"
          id={step.id}
          homeFunctions={homeFunctions}
        />
        <Tooltip title="Collapse this step">
          <IconButton
            aria-label="Collapse"
            onClick={toggle}
            className="justify-self-end"
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
        <div className="content">
          <Editor
            theme="bubble"
            onChange={handleValueChange}
            value={value}
            id="TextEditor"
          />
        </div>
      </Collapse>
    </motion.li>
  );
}
