"use client";

import { useState, useCallback } from "react";
import type { GitState, GitActionResult, ResetMode } from "@/lib/types";
import {
  createInitialState,
  commit as gitCommit,
  createBranch as gitCreateBranch,
  checkout as gitCheckout,
  merge as gitMerge,
  stash as gitStash,
  unstash as gitUnstash,
  reset as gitReset,
} from "@/lib/git-engine";

interface UseGitEngineReturn {
  state: GitState;
  lastError: string | null;
  commit: (message: string) => void;
  createBranch: (name: string) => void;
  checkout: (branchName: string) => void;
  merge: (sourceBranch: string) => void;
  stash: () => void;
  unstash: () => void;
  reset: (mode: ResetMode, targetCommitId: string) => void;
  resetSimulator: () => void;
}

function handleResult(
  result: GitActionResult,
  setState: React.Dispatch<React.SetStateAction<GitState>>,
  setLastError: React.Dispatch<React.SetStateAction<string | null>>,
) {
  if (result.error) {
    setLastError(result.error);
  } else {
    setState(result.state);
    setLastError(null);
  }
}

export function useGitEngine(): UseGitEngineReturn {
  const [state, setState] = useState<GitState>(createInitialState);
  const [lastError, setLastError] = useState<string | null>(null);

  const commit = useCallback((message: string) => {
    setState((prev) => {
      const result = gitCommit(prev, message);
      if (result.error) {
        setTimeout(() => setLastError(result.error ?? null), 0);
        return prev;
      }
      setTimeout(() => setLastError(null), 0);
      return result.state;
    });
  }, []);

  const createBranch = useCallback((name: string) => {
    setState((prev) => {
      const result = gitCreateBranch(prev, name);
      if (result.error) {
        setTimeout(() => setLastError(result.error ?? null), 0);
        return prev;
      }
      setTimeout(() => setLastError(null), 0);
      return result.state;
    });
  }, []);

  const checkout = useCallback((branchName: string) => {
    setState((prev) => {
      const result = gitCheckout(prev, branchName);
      if (result.error) {
        setTimeout(() => setLastError(result.error ?? null), 0);
        return prev;
      }
      setTimeout(() => setLastError(null), 0);
      return result.state;
    });
  }, []);

  const merge = useCallback((sourceBranch: string) => {
    setState((prev) => {
      const result = gitMerge(prev, sourceBranch);
      if (result.error) {
        setTimeout(() => setLastError(result.error ?? null), 0);
        return prev;
      }
      setTimeout(() => setLastError(null), 0);
      return result.state;
    });
  }, []);

  const stash = useCallback(() => {
    setState((prev) => {
      const result = gitStash(prev);
      if (result.error) {
        setTimeout(() => setLastError(result.error ?? null), 0);
        return prev;
      }
      setTimeout(() => setLastError(null), 0);
      return result.state;
    });
  }, []);

  const unstash = useCallback(() => {
    setState((prev) => {
      const result = gitUnstash(prev);
      if (result.error) {
        setTimeout(() => setLastError(result.error ?? null), 0);
        return prev;
      }
      setTimeout(() => setLastError(null), 0);
      return result.state;
    });
  }, []);

  const reset = useCallback((mode: ResetMode, targetCommitId: string) => {
    setState((prev) => {
      const result = gitReset(prev, mode, targetCommitId);
      if (result.error) {
        setTimeout(() => setLastError(result.error ?? null), 0);
        return prev;
      }
      setTimeout(() => setLastError(null), 0);
      return result.state;
    });
  }, []);

  const resetSimulator = useCallback(() => {
    setState(createInitialState());
    setLastError(null);
  }, []);

  return {
    state,
    lastError,
    commit,
    createBranch,
    checkout,
    merge,
    stash,
    unstash,
    reset,
    resetSimulator,
  };
}
