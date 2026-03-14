"use client";

import { useGitEngine } from "@/hooks/use-git-engine";
import { GitGraph } from "@/components/simulator/git-graph";
import { Controls } from "@/components/simulator/controls";
import { CommandDisplay } from "@/components/simulator/command-display";
import { StagingView } from "@/components/simulator/staging-view";

export default function SimulatorPage() {
  const {
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
  } = useGitEngine();

  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-primary-400">
          Module 1
        </p>
        <h2 className="mt-1 text-2xl font-bold text-text-primary">
          Simulateur Git visuel
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Visualise ce que font les commandes Git sur un repo.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left: Git Graph (60%) */}
        <div className="flex-[3] min-h-[600px]">
          <GitGraph state={state} />
        </div>

        {/* Right: Controls (40%) */}
        <div className="flex-[2] space-y-4">
          <CommandDisplay command={state.lastCommand} error={lastError} />
          <Controls
            state={state}
            onCommit={commit}
            onCreateBranch={createBranch}
            onCheckout={checkout}
            onMerge={merge}
            onStash={stash}
            onUnstash={unstash}
            onReset={reset}
            onResetSimulator={resetSimulator}
          />
          <StagingView state={state} />
        </div>
      </div>
    </div>
  );
}
