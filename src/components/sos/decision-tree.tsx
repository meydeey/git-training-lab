"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileX,
  GitBranch,
  RotateCcw,
  Archive,
  GitMerge,
  Eye,
  ChevronRight,
  ArrowLeft,
  Copy,
  Check,
  AlertTriangle,
} from "lucide-react";
import { sosTree, rootSituations } from "@/data/sos-tree";

const iconMap: Record<string, React.ReactNode> = {
  "file-x": <FileX className="h-5 w-5" />,
  "git-branch": <GitBranch className="h-5 w-5" />,
  "rotate-ccw": <RotateCcw className="h-5 w-5" />,
  archive: <Archive className="h-5 w-5" />,
  "git-merge": <GitMerge className="h-5 w-5" />,
  eye: <Eye className="h-5 w-5" />,
};

export function DecisionTree() {
  const [path, setPath] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const currentId = path.length > 0 ? path[path.length - 1] : null;
  const currentNode = currentId ? sosTree[currentId] : null;

  const handleSelect = (id: string) => {
    setPath((prev) => [...prev, id]);
    setCopied(false);
  };

  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
    setCopied(false);
  };

  const handleReset = () => {
    setPath([]);
    setCopied(false);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Root view: show all situations
  if (!currentNode) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {rootSituations.map((id) => {
          const node = sosTree[id];
          return (
            <motion.button
              key={id}
              onClick={() => handleSelect(id)}
              className="group flex items-center gap-4 rounded-xl border border-border bg-elevated-bg p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-border-accent hover:shadow-[0_0_20px_rgba(112,132,255,0.1)]"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                {iconMap[node.icon]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  {node.question}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-text-secondary transition-transform group-hover:translate-x-1" />
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Solution view
  if (currentNode.solution) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-xl"
        >
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-text-secondary transition-colors hover:bg-elevated-bg hover:text-text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour
            </button>
            <span className="text-text-secondary">|</span>
            <button
              onClick={handleReset}
              className="text-sm text-primary-400 transition-colors hover:text-primary"
            >
              Recommencer
            </button>
          </div>

          {/* Solution card */}
          <div className="rounded-xl border border-border-accent bg-surface-bg p-6 shadow-[0_0_30px_rgba(112,132,255,0.1)]">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-success">
              Solution
            </p>

            {/* Command */}
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-deep-bg p-4">
              <code className="flex-1 font-mono text-sm text-success">
                <span className="text-text-secondary">$ </span>
                {currentNode.solution.command}
              </code>
              <button
                onClick={() => handleCopy(currentNode.solution!.command)}
                className="rounded-md p-1.5 text-text-secondary transition-colors hover:bg-elevated-bg hover:text-text-primary"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Explanation */}
            <p className="text-sm leading-relaxed text-text-secondary">
              {currentNode.solution.explanation}
            </p>

            {/* Warning */}
            {currentNode.solution.warning && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-warning/10 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                <p className="text-xs leading-relaxed text-warning">
                  {currentNode.solution.warning}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Sub-question view
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-xl"
      >
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-text-secondary transition-colors hover:bg-elevated-bg hover:text-text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour
          </button>
          <span className="text-text-secondary">|</span>
          <button
            onClick={handleReset}
            className="text-sm text-primary-400 transition-colors hover:text-primary"
          >
            Recommencer
          </button>
        </div>

        {/* Question */}
        <h3 className="mb-4 text-lg font-semibold text-text-primary">
          {currentNode.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentNode.options?.map((option) => (
            <motion.button
              key={option.nextId}
              onClick={() => handleSelect(option.nextId)}
              className="group flex w-full items-center gap-3 rounded-xl border border-border bg-elevated-bg p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-border-accent hover:shadow-[0_0_15px_rgba(112,132,255,0.1)]"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <p className="flex-1 text-sm text-text-primary">{option.label}</p>
              <ChevronRight className="h-4 w-4 text-text-secondary transition-transform group-hover:translate-x-1" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
