"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

interface CommandDisplayProps {
  command: string | null;
  error: string | null;
}

export function CommandDisplay({ command, error }: CommandDisplayProps) {
  return (
    <div className="rounded-xl border border-border bg-deep-bg p-4">
      <div className="mb-2 flex items-center gap-2">
        <Terminal className="h-3.5 w-3.5 text-primary-400" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-primary-400">
          Commande Git
        </span>
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg bg-error/10 px-3 py-2 font-mono text-sm text-error"
          >
            {error}
          </motion.div>
        ) : command ? (
          <motion.div
            key={command}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg bg-surface-bg px-3 py-2 font-mono text-sm text-success"
          >
            <span className="text-text-secondary">$ </span>
            {command}
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            className="font-mono text-xs text-text-secondary"
          >
            Clique sur une action pour voir la commande...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
