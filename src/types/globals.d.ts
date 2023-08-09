declare type Step = {
  id: number;
  name: string;
  content: string;
  done: boolean;
};

declare type Project = {
  id: number;
  name: string;
  steps: Step[];
  done: boolean;
};

declare type Folder = {
  id: number;
  name: string;
  projects: Project[];
  done: boolean;
};
declare type homeFunctions = {
  database: Folder[];
  setDatabase: (database: Folder[]) => void;
  getFolderById: (folderId: number) => Folder | undefined;
  getProjectById: (projectId: number) => Project | undefined;
  getStepById: (stepId: number) => Step | undefined;
  modifyFolderById: (id: number, modifications: Partial<Folder>) => void;
  modifyProjectById: (id: number, modifications: Partial<Project>) => void;
  modifyStepById: (id: number, modifications: Partial<Step>) => void;
  updateStepContent: (id: number, newContent: string) => void;
  updateFolderName: (folderId: number, newName: string) => void;
  updateProjectName: (projectId: number, newName: string) => void;
  updateStepName: (stepId: number, newName: string) => void;
  createNewFolder: (folderName?: string) => void;
  createNewProject: (folderId: number, projectName?: string) => void;
  createNewStep: (projectId: number, stepName?: string) => void;
  deleteFolderById: (folderId: number) => void;
  deleteProjectById: (projectId: number) => void;
  deleteStepById: (stepId: number) => void;
  setFolderAsDone: (folderId: number, done: boolean) => void;
  setProjectAsDone: (projectId: number, done: boolean) => void;
  setStepAsDone: (stepId: number, done: boolean) => void;
  isFolderDone: (folderId: number) => boolean;
  isProjectDone: (projectId: number) => boolean;
  isStepDone: (stepId: number) => boolean;

  storeData: (name: string, data: any) => void;
  getData: (name: string) => any;
};
