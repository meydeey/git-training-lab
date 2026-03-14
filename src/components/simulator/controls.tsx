"use client";

import { useState } from "react";
import {
  GitCommitHorizontal,
  GitBranch,
  GitMerge,
  ArrowLeftRight,
  Archive,
  ArchiveRestore,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import type { GitState, ResetMode } from "@/lib/types";

interface ControlsProps {
  state: GitState;
  onCommit: (message: string) => void;
  onCreateBranch: (name: string) => void;
  onCheckout: (branchName: string) => void;
  onMerge: (sourceBranch: string) => void;
  onStash: () => void;
  onUnstash: () => void;
  onReset: (mode: ResetMode, targetCommitId: string) => void;
  onResetSimulator: () => void;
}

type ModalType = "commit" | "branch" | "checkout" | "merge" | "reset" | null;

export function Controls({
  state,
  onCommit,
  onCreateBranch,
  onCheckout,
  onMerge,
  onStash,
  onUnstash,
  onReset,
  onResetSimulator,
}: ControlsProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [inputValue, setInputValue] = useState("");
  const [resetMode, setResetMode] = useState<ResetMode>("mixed");
  const [selectedCommit, setSelectedCommit] = useState("");

  const handleSubmit = () => {
    switch (activeModal) {
      case "commit":
        if (inputValue.trim()) onCommit(inputValue.trim());
        break;
      case "branch":
        if (inputValue.trim()) onCreateBranch(inputValue.trim());
        break;
      case "checkout":
        if (inputValue) onCheckout(inputValue);
        break;
      case "merge":
        if (inputValue) onMerge(inputValue);
        break;
      case "reset":
        if (selectedCommit) onReset(resetMode, selectedCommit);
        break;
    }
    setActiveModal(null);
    setInputValue("");
    setSelectedCommit("");
  };

  const otherBranches = state.branches.filter((b) => b.name !== state.head);

  return (
    <div className="space-y-4">
      {/* Basic actions */}
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-primary-400">
          Actions de base
        </p>
        <div className="grid grid-cols-2 gap-2">
          <ActionButton
            icon={<GitCommitHorizontal className="h-4 w-4" />}
            label="Commit"
            onClick={() => {
              setActiveModal("commit");
              setInputValue("");
            }}
          />
          <ActionButton
            icon={<GitBranch className="h-4 w-4" />}
            label="Branch"
            onClick={() => {
              setActiveModal("branch");
              setInputValue("");
            }}
          />
          <ActionButton
            icon={<ArrowLeftRight className="h-4 w-4" />}
            label="Checkout"
            onClick={() => {
              setActiveModal("checkout");
              setInputValue(otherBranches[0]?.name ?? "");
            }}
            disabled={state.branches.length < 2}
          />
          <ActionButton
            icon={<GitMerge className="h-4 w-4" />}
            label="Merge"
            onClick={() => {
              setActiveModal("merge");
              setInputValue(otherBranches[0]?.name ?? "");
            }}
            disabled={otherBranches.length === 0}
          />
        </div>
      </div>

      {/* Advanced actions */}
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-primary-400">
          Actions avancées
        </p>
        <div className="grid grid-cols-2 gap-2">
          <ActionButton
            icon={<Archive className="h-4 w-4" />}
            label="Stash"
            onClick={onStash}
            disabled={
              state.workingDirectory.length === 0 &&
              state.stagingArea.length === 0
            }
          />
          <ActionButton
            icon={<ArchiveRestore className="h-4 w-4" />}
            label="Stash Pop"
            onClick={onUnstash}
            disabled={state.stash.length === 0}
          />
          <ActionButton
            icon={<RotateCcw className="h-4 w-4" />}
            label="Reset"
            onClick={() => {
              setActiveModal("reset");
              setResetMode("mixed");
              setSelectedCommit(
                state.commits[state.commits.length - 2]?.id ?? "",
              );
            }}
            disabled={state.commits.length < 2}
          />
          <ActionButton
            icon={<RefreshCw className="h-4 w-4" />}
            label="Recommencer"
            onClick={onResetSimulator}
            variant="danger"
          />
        </div>
      </div>

      {/* Modal overlay */}
      {activeModal && (
        <div className="rounded-xl border border-border-accent bg-surface-bg p-4">
          <p className="mb-3 text-sm font-semibold text-text-primary">
            {activeModal === "commit" && "Nouveau commit"}
            {activeModal === "branch" && "Nouvelle branche"}
            {activeModal === "checkout" && "Changer de branche"}
            {activeModal === "merge" && "Merger une branche"}
            {activeModal === "reset" && "Reset"}
          </p>

          {(activeModal === "commit" || activeModal === "branch") && (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder={
                activeModal === "commit"
                  ? "Message du commit..."
                  : "Nom de la branche..."
              }
              className="mb-3 w-full rounded-lg border border-border bg-deep-bg px-3 py-2 font-mono text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none"
              autoFocus
            />
          )}

          {(activeModal === "checkout" || activeModal === "merge") && (
            <select
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mb-3 w-full rounded-lg border border-border bg-deep-bg px-3 py-2 font-mono text-sm text-text-primary focus:border-primary focus:outline-none"
            >
              {otherBranches.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          )}

          {activeModal === "reset" && (
            <>
              <div className="mb-3 flex gap-2">
                {(["soft", "mixed", "hard"] as ResetMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setResetMode(mode)}
                    className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                      resetMode === mode
                        ? "bg-primary text-white"
                        : "bg-deep-bg text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    --{mode}
                  </button>
                ))}
              </div>
              <select
                value={selectedCommit}
                onChange={(e) => setSelectedCommit(e.target.value)}
                className="mb-3 w-full rounded-lg border border-border bg-deep-bg px-3 py-2 font-mono text-sm text-text-primary focus:border-primary focus:outline-none"
              >
                {[...state.commits].reverse().map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.message}
                  </option>
                ))}
              </select>
            </>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(112,132,255,0.3)]"
            >
              Confirmer
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="rounded-lg bg-deep-bg px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  disabled = false,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed border-border bg-deep-bg text-text-secondary opacity-50"
          : variant === "danger"
            ? "border-error/20 bg-error/5 text-error hover:-translate-y-0.5 hover:bg-error/10 hover:shadow-[0_0_15px_rgba(248,113,113,0.1)]"
            : "border-border bg-elevated-bg text-text-primary hover:-translate-y-0.5 hover:border-border-accent hover:shadow-[0_0_15px_rgba(112,132,255,0.1)]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
