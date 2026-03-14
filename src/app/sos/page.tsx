"use client";

import { DecisionTree } from "@/components/sos/decision-tree";

export default function SosPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-primary-400">
          Module 2
        </p>
        <h2 className="mt-1 text-2xl font-bold text-text-primary">SOS Git</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Trouve la bonne commande quand tu es bloqué. Clique sur ton problème.
        </p>
      </div>

      <DecisionTree />
    </div>
  );
}
