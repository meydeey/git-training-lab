import { theme } from "./theme";
import type {
  GitState,
  Commit,
  Branch,
  FileEntry,
  GitActionResult,
  ResetMode,
} from "./types";

let commitCounter = 0;

function generateId(): string {
  commitCounter++;
  const hex = commitCounter.toString(16).padStart(7, "0");
  return hex;
}

function getBranchColor(index: number): string {
  return theme.branchColors[index % theme.branchColors.length];
}

// Sample files that simulate changes in the working directory
const sampleFiles: string[] = [
  "index.html",
  "style.css",
  "app.js",
  "README.md",
  "config.json",
  "utils.ts",
  "api.ts",
  "components.tsx",
];

function getRandomFiles(count: number): FileEntry[] {
  const shuffled = [...sampleFiles].sort(() => Math.random() - 0.5);
  const statuses: FileEntry["status"][] = ["modified", "new", "modified"];
  return shuffled.slice(0, count).map((name, i) => ({
    name,
    status: statuses[i % statuses.length],
  }));
}

export function createInitialState(): GitState {
  commitCounter = 0;

  const commit1: Commit = {
    id: generateId(),
    message: "Initial commit",
    parentIds: [],
    branchName: "main",
    timestamp: Date.now() - 3000,
  };

  const commit2: Commit = {
    id: generateId(),
    message: "Ajout page d'accueil",
    parentIds: [commit1.id],
    branchName: "main",
    timestamp: Date.now() - 2000,
  };

  const commit3: Commit = {
    id: generateId(),
    message: "Ajout navigation",
    parentIds: [commit2.id],
    branchName: "main",
    timestamp: Date.now() - 1000,
  };

  const mainBranch: Branch = {
    name: "main",
    commitId: commit3.id,
    color: getBranchColor(0),
  };

  return {
    commits: [commit1, commit2, commit3],
    branches: [mainBranch],
    head: "main",
    isDetached: false,
    workingDirectory: getRandomFiles(2),
    stagingArea: [],
    stash: [],
    lastCommand: null,
  };
}

export function commit(state: GitState, message: string): GitActionResult {
  if (state.isDetached) {
    return {
      state,
      command: `git commit -m "${message}"`,
      error:
        "Impossible de commiter en mode HEAD détaché. Crée une branche d'abord.",
    };
  }

  const currentBranch = state.branches.find((b) => b.name === state.head);
  if (!currentBranch) {
    return { state, command: "", error: "Branche introuvable" };
  }

  const newCommit: Commit = {
    id: generateId(),
    message,
    parentIds: [currentBranch.commitId],
    branchName: currentBranch.name,
    timestamp: Date.now(),
  };

  const updatedBranches = state.branches.map((b) =>
    b.name === state.head ? { ...b, commitId: newCommit.id } : b,
  );

  return {
    state: {
      ...state,
      commits: [...state.commits, newCommit],
      branches: updatedBranches,
      workingDirectory: getRandomFiles(Math.floor(Math.random() * 3) + 1),
      stagingArea: [],
      lastCommand: `git commit -m "${message}"`,
    },
    command: `git commit -m "${message}"`,
  };
}

export function createBranch(state: GitState, name: string): GitActionResult {
  if (state.branches.some((b) => b.name === name)) {
    return {
      state,
      command: `git branch ${name}`,
      error: `La branche "${name}" existe déjà.`,
    };
  }

  const currentCommitId = getCurrentCommitId(state);

  const newBranch: Branch = {
    name,
    commitId: currentCommitId,
    color: getBranchColor(state.branches.length),
  };

  return {
    state: {
      ...state,
      branches: [...state.branches, newBranch],
      lastCommand: `git branch ${name}`,
    },
    command: `git branch ${name}`,
  };
}

export function checkout(state: GitState, branchName: string): GitActionResult {
  const branch = state.branches.find((b) => b.name === branchName);
  if (!branch) {
    return {
      state,
      command: `git checkout ${branchName}`,
      error: `La branche "${branchName}" n'existe pas.`,
    };
  }

  return {
    state: {
      ...state,
      head: branchName,
      isDetached: false,
      lastCommand: `git checkout ${branchName}`,
    },
    command: `git checkout ${branchName}`,
  };
}

export function merge(
  state: GitState,
  sourceBranchName: string,
): GitActionResult {
  if (state.isDetached) {
    return {
      state,
      command: `git merge ${sourceBranchName}`,
      error: "Impossible de merger en mode HEAD détaché.",
    };
  }

  const sourceBranch = state.branches.find((b) => b.name === sourceBranchName);
  const targetBranch = state.branches.find((b) => b.name === state.head);

  if (!sourceBranch || !targetBranch) {
    return {
      state,
      command: `git merge ${sourceBranchName}`,
      error: "Branche introuvable.",
    };
  }

  if (sourceBranch.name === targetBranch.name) {
    return {
      state,
      command: `git merge ${sourceBranchName}`,
      error: "Impossible de merger une branche avec elle-même.",
    };
  }

  // Check if fast-forward is possible
  const isAncestor = isCommitAncestor(
    state,
    targetBranch.commitId,
    sourceBranch.commitId,
  );

  if (isAncestor) {
    // Fast-forward merge
    const updatedBranches = state.branches.map((b) =>
      b.name === state.head ? { ...b, commitId: sourceBranch.commitId } : b,
    );

    return {
      state: {
        ...state,
        branches: updatedBranches,
        lastCommand: `git merge ${sourceBranchName}`,
      },
      command: `git merge ${sourceBranchName}  # fast-forward`,
    };
  }

  // 3-way merge (no conflict in V1)
  const mergeCommit: Commit = {
    id: generateId(),
    message: `Merge '${sourceBranchName}' into '${targetBranch.name}'`,
    parentIds: [targetBranch.commitId, sourceBranch.commitId],
    branchName: targetBranch.name,
    timestamp: Date.now(),
  };

  const updatedBranches = state.branches.map((b) =>
    b.name === state.head ? { ...b, commitId: mergeCommit.id } : b,
  );

  return {
    state: {
      ...state,
      commits: [...state.commits, mergeCommit],
      branches: updatedBranches,
      lastCommand: `git merge ${sourceBranchName}`,
    },
    command: `git merge ${sourceBranchName}`,
  };
}

export function stash(state: GitState): GitActionResult {
  if (state.workingDirectory.length === 0 && state.stagingArea.length === 0) {
    return {
      state,
      command: "git stash",
      error: "Rien à stasher — le working directory est propre.",
    };
  }

  const newStashEntry = {
    id: state.stash.length,
    files: [...state.workingDirectory, ...state.stagingArea],
    message: `WIP on ${state.head}`,
  };

  return {
    state: {
      ...state,
      stash: [newStashEntry, ...state.stash],
      workingDirectory: [],
      stagingArea: [],
      lastCommand: "git stash",
    },
    command: "git stash",
  };
}

export function unstash(state: GitState): GitActionResult {
  if (state.stash.length === 0) {
    return {
      state,
      command: "git stash pop",
      error: "Le stash est vide.",
    };
  }

  const [top, ...rest] = state.stash;

  return {
    state: {
      ...state,
      stash: rest,
      workingDirectory: [...state.workingDirectory, ...top.files],
      lastCommand: "git stash pop",
    },
    command: "git stash pop",
  };
}

export function reset(
  state: GitState,
  mode: ResetMode,
  targetCommitId: string,
): GitActionResult {
  if (state.isDetached) {
    return {
      state,
      command: `git reset --${mode} ${targetCommitId.slice(0, 7)}`,
      error: "Impossible de reset en mode HEAD détaché.",
    };
  }

  const targetCommit = state.commits.find((c) => c.id === targetCommitId);
  if (!targetCommit) {
    return {
      state,
      command: `git reset --${mode} ${targetCommitId.slice(0, 7)}`,
      error: "Commit introuvable.",
    };
  }

  const updatedBranches = state.branches.map((b) =>
    b.name === state.head ? { ...b, commitId: targetCommitId } : b,
  );

  let workingDirectory = state.workingDirectory;
  let stagingArea = state.stagingArea;

  switch (mode) {
    case "soft":
      // Keep working dir and staging area as-is
      break;
    case "mixed":
      // Unstage everything but keep working dir changes
      workingDirectory = [...state.workingDirectory, ...state.stagingArea];
      stagingArea = [];
      break;
    case "hard":
      // Discard everything
      workingDirectory = [];
      stagingArea = [];
      break;
  }

  const shortId = targetCommitId.slice(0, 7);

  return {
    state: {
      ...state,
      branches: updatedBranches,
      workingDirectory,
      stagingArea,
      lastCommand: `git reset --${mode} ${shortId}`,
    },
    command: `git reset --${mode} ${shortId}`,
  };
}

// Helper: get current commit ID from HEAD
export function getCurrentCommitId(state: GitState): string {
  if (state.isDetached) {
    return state.head;
  }
  const branch = state.branches.find((b) => b.name === state.head);
  return branch?.commitId ?? "";
}

// Helper: check if ancestorId is an ancestor of descendantId
function isCommitAncestor(
  state: GitState,
  ancestorId: string,
  descendantId: string,
): boolean {
  if (ancestorId === descendantId) return true;

  const visited = new Set<string>();
  const queue = [descendantId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    if (currentId === ancestorId) return true;
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const commit = state.commits.find((c) => c.id === currentId);
    if (commit) {
      queue.push(...commit.parentIds);
    }
  }

  return false;
}
