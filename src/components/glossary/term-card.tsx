"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, X } from "lucide-react";
import type { GlossaryTerm } from "@/data/glossary-terms";
import { TermAnimation } from "./term-animation";

interface TermCardProps {
  term: GlossaryTerm;
}

export function TermCard({ term }: TermCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    setAnimKey((k) => k + 1);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setAnimKey((k) => k + 1);
      setIsPlaying(true);
    }, 50);
  };

  return (
    <>
      <motion.button
        onClick={handleOpen}
        className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-elevated-bg p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-border-accent hover:shadow-[0_0_20px_rgba(112,132,255,0.1)]"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <h3 className="font-mono text-sm font-semibold text-primary-400">
          {term.name}
        </h3>
        <p className="text-xs leading-relaxed text-text-secondary">
          {term.description}
        </p>
        <div className="mt-auto flex items-center gap-1.5 pt-2">
          <Play className="h-3 w-3 text-primary" />
          <span className="font-mono text-[10px] text-primary">
            Voir l&apos;animation
          </span>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="mx-4 w-full max-w-lg rounded-2xl border border-border-accent bg-surface-bg p-6 shadow-[0_0_40px_rgba(112,132,255,0.15)]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-mono text-lg font-bold text-primary">
                  {term.name}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-elevated-bg hover:text-text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Animation */}
              <div className="mb-4 h-[200px] rounded-xl border border-border bg-elevated-bg">
                <div key={animKey}>
                  <TermAnimation
                    type={term.animationType}
                    isPlaying={isPlaying}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                {term.description}
              </p>

              {/* Replay button */}
              <button
                onClick={handleReplay}
                className="flex items-center gap-2 rounded-lg border border-border bg-elevated-bg px-4 py-2 text-sm text-text-primary transition-all hover:-translate-y-0.5 hover:border-border-accent hover:shadow-[0_0_15px_rgba(112,132,255,0.1)]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Rejouer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
