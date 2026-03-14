"use client";

import { motion } from "framer-motion";
import type { ScenarioState } from "@/data/quiz-scenarios";

const NODE_R = 12;
const GAP_X = 50;
const GAP_Y = 50;
const PAD = 30;

interface ScenarioViewProps {
  state: ScenarioState;
  label: string;
}

export function ScenarioView({ state, label }: ScenarioViewProps) {
  // Compute max commits count for SVG sizing
  const maxCommits = Math.max(...state.branches.map((b) => b.commits.length));
  const svgW = PAD * 2 + maxCommits * GAP_X;
  const svgH = PAD * 2 + state.branches.length * GAP_Y;

  return (
    <div className="rounded-xl border border-border bg-elevated-bg p-4">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-primary-400">
        {label}
      </p>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="h-full w-full"
        style={{ maxHeight: 150 }}
      >
        {state.branches.map((branch, branchIdx) => {
          const y = PAD + branchIdx * GAP_Y;

          return (
            <g key={branch.name}>
              {/* Branch line */}
              <line
                x1={PAD}
                y1={y}
                x2={PAD + (branch.commits.length - 1) * GAP_X}
                y2={y}
                stroke={branch.color}
                strokeWidth={2}
                opacity={0.4}
              />

              {/* Commits */}
              {branch.commits.map((commitLabel, commitIdx) => {
                const x = PAD + commitIdx * GAP_X;
                const isHead =
                  state.head === branch.name &&
                  commitIdx === branch.commits.length - 1;
                const isDetachedHead = state.head === commitLabel;

                return (
                  <g key={`${branch.name}-${commitLabel}`}>
                    {/* Glow for HEAD */}
                    {(isHead || isDetachedHead) && (
                      <circle
                        cx={x}
                        cy={y}
                        r={NODE_R + 5}
                        fill="none"
                        stroke={isDetachedHead ? "#FBBF24" : branch.color}
                        strokeWidth={1.5}
                        opacity={0.3}
                      />
                    )}

                    <circle
                      cx={x}
                      cy={y}
                      r={NODE_R}
                      fill={isHead || isDetachedHead ? branch.color : "#0C1429"}
                      stroke={branch.color}
                      strokeWidth={2}
                    />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fill={isHead || isDetachedHead ? "#0C1429" : "#F4F5FB"}
                      fontSize={10}
                      fontFamily="'Fira Code', monospace"
                      fontWeight={600}
                    >
                      {commitLabel}
                    </text>

                    {/* HEAD label */}
                    {(isHead || isDetachedHead) && (
                      <text
                        x={x}
                        y={y - NODE_R - 8}
                        textAnchor="middle"
                        fill="#FBBF24"
                        fontSize={8}
                        fontFamily="'Fira Code', monospace"
                        fontWeight={600}
                      >
                        HEAD
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Branch label */}
              <text
                x={PAD + (branch.commits.length - 1) * GAP_X + NODE_R + 8}
                y={y + 4}
                fill={branch.color}
                fontSize={10}
                fontFamily="'Fira Code', monospace"
              >
                {branch.name}
              </text>
            </g>
          );
        })}

        {/* Cross-branch connections (for branches sharing commits) */}
        {state.branches.length > 1 &&
          state.branches[0].commits[0] === state.branches[1]?.commits[0] && (
            <motion.path
              d={`M ${PAD} ${PAD} L ${PAD} ${PAD + GAP_Y}`}
              fill="none"
              stroke={state.branches[1].color}
              strokeWidth={1.5}
              opacity={0.3}
              strokeDasharray="4 3"
            />
          )}
      </svg>
    </div>
  );
}
