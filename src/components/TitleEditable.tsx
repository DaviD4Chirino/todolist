"use client";
import React, { useState } from "react";

export default function TitleEditable({
  name,
  id,
  homeFunctions,
  heading,
  owner,
}: {
  name: string;
  id: number;
  homeFunctions: homeFunctions;
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  owner: "folder" | "project" | "step";
}) {
  const [title, setTitle] = useState(name || "No name");
  const [isEditable, setIsEditable] = useState(false);

  const handleClick = () => {
    setIsEditable(true);
  };

  const handleBlur = (e: any) => {
    setIsEditable(false);
    handleTitleChange(e);
  };

  function handleTitleChange(e: any) {
    setTitle(e.target.innerText);
    updateNameByOwner(e);
  }

  function updateNameByOwner(e: any) {
    switch (owner) {
      case "folder":
        homeFunctions.updateFolderName(id, e.target.innerText);
        break;
      case "project":
        homeFunctions.updateProjectName(id, e.target.innerText);
        break;
      case "step":
        homeFunctions.updateStepName(id, e.target.innerText);
        break;
      default:
        break;
    }
  }
  switch (heading) {
    case "h1":
      return (
        <h1
          className="title self-flex-1 content-editable-title"
          contentEditable={isEditable}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={handleTitleChange}
        >
          {title}
        </h1>
      );
    case "h2":
      return (
        <h2
          className="title self-flex-1 content-editable-title"
          contentEditable={isEditable}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={handleTitleChange}
        >
          {title}
        </h2>
      );
    case "h3":
      return (
        <h3
          className="title self-flex-1 content-editable-title"
          contentEditable={isEditable}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={handleTitleChange}
        >
          {title}
        </h3>
      );
    case "h4":
      return (
        <h4
          className="title self-flex-1 content-editable-title"
          contentEditable={isEditable}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={handleTitleChange}
        >
          {title}
        </h4>
      );
    case "h5":
      return (
        <h5
          className="title self-flex-1 content-editable-title"
          contentEditable={isEditable}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={handleTitleChange}
        >
          {title}
        </h5>
      );
    case "h6":
      return (
        <h6
          className="title self-flex-1 content-editable-title"
          contentEditable={isEditable}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={handleTitleChange}
        >
          {title}
        </h6>
      );
    default:
      return (
        <h1
          className="title self-flex-1 content-editable-title"
          contentEditable={isEditable}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={handleTitleChange}
        >
          {title}
        </h1>
      );
  }
}
