"use client";

import { motion, AnimatePresence } from "framer-motion";
import { File, FolderOpen, Archive } from "lucide-react";
import type { GitState } from "@/lib/types";

interface StagingViewProps {
  state: GitState;
}

const statusColors: Record<string, string> = {
  modified: "text-warning",
  new: "text-success",
  deleted: "text-error",
  untracked: "text-text-secondary",
};

const statusLabels: Record<string, string> = {
  modified: "M",
  new: "A",
  deleted: "D",
  untracked: "?",
};

export function StagingView({ state }: StagingViewProps) {
  return (
    <div className="space-y-3">
      {/* Working Directory */}
      <div className="rounded-xl border border-border bg-deep-bg p-3">
        <div className="mb-2 flex items-center gap-2">
          <FolderOpen className="h-3.5 w-3.5 text-warning" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-primary-400">
            Working Directory
          </span>
          <span className="ml-auto font-mono text-[10px] text-text-secondary">
            {state.workingDirectory.length} fichier
            {state.workingDirectory.length !== 1 ? "s" : ""}
          </span>
        </div>
        <AnimatePresence>
          {state.workingDirectory.length > 0 ? (
            <ul className="space-y-1">
              {state.workingDirectory.map((file) => (
                <motion.li
                  key={file.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2 text-xs"
                >
                  <File className="h-3 w-3 text-text-secondary" />
                  <span className="font-mono text-text-primary">
                    {file.name}
                  </span>
                  <span
                    className={`ml-auto font-mono text-[10px] font-bold ${statusColors[file.status]}`}
                  >
                    {statusLabels[file.status]}
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-center font-mono text-[10px] text-text-secondary">
              Propre
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* Stash */}
      {state.stash.length > 0 && (
        <div className="rounded-xl border border-border-accent bg-deep-bg p-3">
          <div className="mb-2 flex items-center gap-2">
            <Archive className="h-3.5 w-3.5 text-primary-400" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-primary-400">
              Stash
            </span>
            <span className="ml-auto font-mono text-[10px] text-text-secondary">
              {state.stash.length} entrée{state.stash.length !== 1 ? "s" : ""}
            </span>
          </div>
          <ul className="space-y-1">
            {state.stash.map((entry) => (
              <li
                key={entry.id}
                className="font-mono text-[11px] text-text-secondary"
              >
                stash@{`{${entry.id}}`}: {entry.message} ({entry.files.length}{" "}
                fichiers)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
