"use client";

import { glossaryTerms } from "@/data/glossary-terms";
import { TermCard } from "@/components/glossary/term-card";

export default function GlossaryPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-primary-400">
          Module 4
        </p>
        <h2 className="mt-1 text-2xl font-bold text-text-primary">
          Glossaire visuel
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Chaque terme Git expliqué avec une animation. Clique pour voir.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {glossaryTerms.map((term) => (
          <TermCard key={term.id} term={term} />
        ))}
      </div>
    </div>
  );
}
