export interface Commit {
  id: string;
  message: string;
  parentIds: string[];
  branchName: string;
  timestamp: number;
}

export interface Branch {
  name: string;
  commitId: string;
  color: string;
}

export interface FileEntry {
  name: string;
  status: "modified" | "new" | "deleted" | "untracked";
}

export interface StashEntry {
  id: number;
  files: FileEntry[];
  message: string;
}

export interface GitState {
  commits: Commit[];
  branches: Branch[];
  head: string; // branch name or commit id (detached)
  isDetached: boolean;
  workingDirectory: FileEntry[];
  stagingArea: FileEntry[];
  stash: StashEntry[];
  lastCommand: string | null;
}

export type ResetMode = "soft" | "mixed" | "hard";

export interface GitActionResult {
  state: GitState;
  command: string;
  error?: string;
}
