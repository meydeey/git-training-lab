"use client";

import { QuizEngine } from "@/components/quiz/quiz-engine";

export default function QuizPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-primary-400">
          Module 3
        </p>
        <h2 className="mt-1 text-2xl font-bold text-text-primary">
          Quiz — Qu&apos;est-ce qui s&apos;est passé ?
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Observe l&apos;avant/après et identifie la commande Git utilisée.
        </p>
      </div>

      <div className="max-w-3xl">
        <QuizEngine />
      </div>
    </div>
  );
}
