"use client";
import "../sass/home.sass";
import Folder from "@/modules/Folder";
import { useEffect, useState, useRef } from "react";
import { BsPlusLg as PlusI } from "react-icons/bs";
import {
  AiOutlineDownload as DownloadI,
  AiOutlineUpload as UploadI,
} from "react-icons/ai";

import uid from "@/components/uid";
import { Fab, Tooltip, IconButton } from "@mui/material";
import { AnimatePresence } from "framer-motion";
const dummyDatabase: Folder[] = [
  {
    id: uid(),
    name: "Click here to edit this folder",
    done: false,
    projects: [
      {
        id: uid() + 1,
        name: "Click here to edit this project",
        done: false,
        projects: [],
        steps: [
          {
            id: uid() + 2,
            name: "Click here to edit this step",
            done: false,
            content: "",
          },
        ],
      },
    ],
  },
];

export default function Page() {
  const [database, setDatabase] = useState<Folder[]>(
    isValidDatabase(getData("database") as Folder[])
      ? getData("database") || dummyDatabase
      : dummyDatabase
  );
  useEffect(() => {
    // console.log(database);
    storeData("database", database);
  }, [database]);

  function moveCompletedItemsToEnd(): void {
    setDatabase((prevDatabase) => {
      const updatedDatabase = [...prevDatabase];

      updatedDatabase.sort((a, b) => {
        if (a.done && !b.done) {
          return 1;
        } else if (!a.done && b.done) {
          return -1;
        } else {
          return 0;
        }
      });

      updatedDatabase.forEach((folder) => {
        folder.projects.sort((a, b) => {
          if (a.done && !b.done) {
            return 1;
          } else if (!a.done && b.done) {
            return -1;
          } else {
            return 0;
          }
        });

        folder.projects.forEach((project) => {
          project.steps.sort((a, b) => {
            if (a.done && !b.done) {
              return 1;
            } else if (!a.done && b.done) {
              return -1;
            } else {
              return 0;
            }
          });
        });
      });

      return updatedDatabase;
    });
  }

  function getFolderById(folderId: number): Folder | undefined {
    return database.find((folder) => folder.id === folderId);
  }

  function getProjectById(projectId: number): Project | undefined {
    return database
      .flatMap((folder) => folder.projects)
      .find((project) => project.id === projectId);
  }

  function getStepById(stepId: number): Step | undefined {
    return database
      .flatMap((folder) => folder.projects)
      .flatMap((project) => project.steps)
      .find((step) => step.id === stepId);
  }
  function modifyFolderById(id: number, modifications: Partial<Folder>): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) =>
        folder.id === id ? { ...folder, ...modifications } : folder
      )
    );
  }
  function modifyProjectById(
    id: number,
    modifications: Partial<Project>
  ): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) => ({
        ...folder,
        projects: folder.projects.map((project) =>
          project.id === id ? { ...project, ...modifications } : project
        ),
      }))
    );
  }

  function updateStepContent(stepId: number, newContent: string): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) => ({
        ...folder,
        projects: folder.projects.map((project) => ({
          ...project,
          steps: project.steps.map((step) =>
            step.id === stepId ? { ...step, content: newContent } : step
          ),
        })),
      }))
    );
  }

  function modifyStepById(id: number, modifications: Partial<Step>): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) => ({
        ...folder,
        projects: folder.projects.map((project) => ({
          ...project,
          steps: project.steps.map((step) =>
            step.id === id ? { ...step, ...modifications } : step
          ),
        })),
      }))
    );
  }

  function updateFolderName(folderId: number, newName: string): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) =>
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );
  }

  function updateProjectName(projectId: number, newName: string): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) => ({
        ...folder,
        projects: folder.projects.map((project) =>
          project.id === projectId ? { ...project, name: newName } : project
        ),
      }))
    );
  }
  function updateStepName(stepId: number, newName: string): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) => ({
        ...folder,
        projects: folder.projects.map((project) => ({
          ...project,
          steps: project.steps.map((step) =>
            step.id === stepId ? { ...step, name: newName } : step
          ),
        })),
      }))
    );
  }
  function createNewFolder(folderName?: string): void {
    const newFolder: Folder = {
      id: uid(),
      name: folderName || "Click here to edit this folder",
      projects: [
        {
          id: uid(),
          name: "Click here to edit this project",
          done: false,
          projects: [],
          steps: [
            {
              id: uid(),
              name: "Click here to edit this step",
              done: false,
              content: "",
            },
          ],
        },
      ],
      done: false,
    };
    setDatabase((prevDatabase) => [...prevDatabase, newFolder]);
  }
  function createNewProject(folderId: number, projectName?: string): void {
    const newProject: Project = {
      id: uid(),
      name: projectName || "Click here to edit this project",
      projects: [],
      steps: [],
      done: false,
    };
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) =>
        folder.id === folderId
          ? { ...folder, projects: [...folder.projects, newProject] }
          : folder
      )
    );
  }
  function createNewStep(projectId: number, stepName?: string): void {
    const newStep: Step = {
      id: uid(),
      name: stepName || "Click here to edit this step",
      content: "",
      done: false,
    };
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) => ({
        ...folder,
        projects: folder.projects.map((project) =>
          project.id === projectId
            ? { ...project, steps: [...project.steps, newStep] }
            : project
        ),
      }))
    );
  }
  function deleteFolderById(folderId: number): void {
    setDatabase((prevDatabase) =>
      prevDatabase.filter((folder) => folder.id !== folderId)
    );
  }
  function deleteProjectById(projectId: number): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) => ({
        ...folder,
        projects: folder.projects.filter((project) => project.id !== projectId),
      }))
    );
  }
  function deleteStepById(stepId: number): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) => ({
        ...folder,
        projects: folder.projects.map((project) => ({
          ...project,
          steps: project.steps.filter((step) => step.id !== stepId),
        })),
      }))
    );
  }
  function setFolderAsDone(folderId: number, done: boolean): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) =>
        folder.id === folderId ? { ...folder, done: done } : folder
      )
    );
    moveCompletedItemsToEnd();
  }

  function setProjectAsDone(projectId: number, done: boolean): void {
    setDatabase((prevDatabase) =>
      prevDatabase.map((folder) => ({
        ...folder,
        projects: folder.projects.map((project) =>
          project.id === projectId ? { ...project, done: done } : project
        ),
      }))
    );
    moveCompletedItemsToEnd();
  }

  function setStepAsDone(stepId: number, done: boolean): void {
    setDatabase((prevDatabase) => {
      const updatedDatabase = prevDatabase.map((folder) => {
        const updatedProjects = folder.projects.map((project) => {
          const updatedSteps = project.steps.map((step) => {
            if (step.id === stepId) {
              return { ...step, done: done };
            }
            return step;
          });
          return { ...project, steps: updatedSteps };
        });
        return { ...folder, projects: updatedProjects };
      });
      return updatedDatabase;
    });
    moveCompletedItemsToEnd();
  }
  function isFolderDone(folderId: number): boolean {
    const folder = database.find((folder) => folder.id === folderId);
    return folder ? folder.done : false;
  }

  function isProjectDone(projectId: number): boolean {
    const project = database
      .flatMap((folder) => folder.projects)
      .find((project) => project.id === projectId);
    return project ? project.done : false;
  }

  function isStepDone(stepId: number): boolean {
    const step = database
      .flatMap((folder) => folder.projects)
      .flatMap((project) => project.steps)
      .find((step) => step.id === stepId);
    return step ? step.done : false;
  }
  const homeFunctions: homeFunctions = {
    database,
    setDatabase,
    getFolderById,
    getProjectById,
    getStepById,
    modifyFolderById,
    modifyProjectById,
    modifyStepById,
    updateStepContent,
    updateFolderName,
    updateProjectName,
    updateStepName,
    createNewFolder,
    createNewProject,
    createNewStep,
    deleteFolderById,
    deleteProjectById,
    deleteStepById,
    setFolderAsDone,
    setProjectAsDone,
    setStepAsDone,
    isFolderDone,
    isProjectDone,
    isStepDone,
    storeData,
    getData,
  };
  function handleCreateFolder() {
    createNewFolder();
  }

  function downloadData() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }
    const data = JSON.stringify(database);
    const blob = new Blob([data], { type: "text/json" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "database.json";
    anchor.click();
  }
  function handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContents = e.target?.result;
        const valid = isValidJson(fileContents as string);
        if (valid) {
          setDatabase(valid as Folder[]);
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <div id="Home">
      <nav id="NavBar">
        <div className="container" id="Content">
          <Tooltip title="Import your data">
            <IconButton component="label">
              <UploadI />
              <input
                hidden
                accept=".json"
                multiple
                type="file"
                name="downloadDatabase"
                onChange={handleFileUpload}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download your data">
            <IconButton aria-label="download data" onClick={downloadData}>
              <DownloadI className="icon" />
            </IconButton>
          </Tooltip>
        </div>
      </nav>
      {database.length === 0 && (
        <img
          src="/todolist-info.png"
          className="infographic fade-in"
          alt="infographic"
        />
      )}
      <Tooltip title="Create a new folder">
        <Fab
          id="FAB"
          color="primary"
          aria-label="add folder"
          size="large"
          onClick={handleCreateFolder}
        >
          <PlusI className="icon" />
        </Fab>
      </Tooltip>
      <AnimatePresence>
        {database.map((folder) => (
          <Folder
            key={folder.id}
            id={folder.id}
            projects={folder.projects}
            name={folder.name}
            homeFunctions={homeFunctions}
            transitionPosition
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
// ! BAD CODE
function isValidJson(json: string): boolean | Folder[] {
  const data: Folder[] = JSON.parse(json);
  if (!Array.isArray(data)) {
    console.log("Invalid JSON: data is not an array");
    return false;
  }
  for (const folder of data) {
    if (!folder.hasOwnProperty("id")) {
      console.log("Invalid JSON: folder is missing 'id' property");
      return false;
    }
    if (!folder.hasOwnProperty("name")) {
      console.log("Invalid JSON: folder is missing 'name' property");
      return false;
    }
    if (!folder.hasOwnProperty("done")) {
      console.log("Invalid JSON: folder is missing 'done' property");
      return false;
    }

    if (!folder.hasOwnProperty("projects")) {
      console.log("Invalid JSON: folder is missing 'projects' property");
      return false;
    }
    if (!Array.isArray(folder.projects)) {
      console.log("Invalid JSON: folder.projects is not an array");
      return false;
    }
    for (const project of folder.projects) {
      if (!project.hasOwnProperty("id")) {
        console.log("Invalid JSON: project is missing 'id' property");
        return false;
      }
      if (!project.hasOwnProperty("name")) {
        console.log("Invalid JSON: project is missing 'name' property");
        return false;
      }
      if (!project.hasOwnProperty("steps")) {
        console.log("Invalid JSON: project is missing 'steps' property");
        return false;
      }
      if (!Array.isArray(project.steps)) {
        console.log("Invalid JSON: project.steps is not an array");
        return false;
      }
      for (const step of project.steps) {
        if (!step.hasOwnProperty("id")) {
          console.log("Invalid JSON: step is missing 'id' property");
          return false;
        }
        if (!step.hasOwnProperty("name")) {
          console.log("Invalid JSON: step is missing 'name' property");
          return false;
        }
        if (!step.hasOwnProperty("content")) {
          console.log("Invalid JSON: step is missing 'content' property");
          return false;
        }
      }
    }
  }
  return data;
}

function storeData(name: string, data: any) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "";
  }
  localStorage.setItem(name, JSON.stringify(data));
}

function getData(key: string): Folder[] | undefined {
  const data = localStorage.getItem(key);
  if (data) {
    const parsedData = JSON.parse(data) as Folder[];
    if (isValidDatabase(parsedData)) {
      return parsedData;
    }
  }
  return dummyDatabase;
}

function isValidDatabase(database: Folder[]): boolean {
  const validFolder = database.every((folder) => {
    return (
      folder.hasOwnProperty("id") &&
      folder.hasOwnProperty("name") &&
      folder.hasOwnProperty("done") &&
      folder.hasOwnProperty("projects")
    );
  });

  const validProjects = database.every((folder) => {
    return folder.projects.every((project) => {
      return (
        project.hasOwnProperty("id") &&
        project.hasOwnProperty("name") &&
        project.hasOwnProperty("steps") &&
        project.hasOwnProperty("done") &&
        project.hasOwnProperty("projects")
      );
    });
  });
  const validSteps = database.every((folder) => {
    return folder.projects.every((project) => {
      return project.steps.every((step) => {
        return (
          step.hasOwnProperty("id") &&
          step.hasOwnProperty("name") &&
          step.hasOwnProperty("content") &&
          step.hasOwnProperty("done")
        );
      });
    });
  });

  return validFolder && validProjects && validSteps;
}
