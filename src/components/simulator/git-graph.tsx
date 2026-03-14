"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { GitState, Commit } from "@/lib/types";
import { getCurrentCommitId } from "@/lib/git-engine";

const NODE_RADIUS = 14;
const VERTICAL_GAP = 60;
const HORIZONTAL_GAP = 120;
const PADDING_TOP = 40;
const PADDING_LEFT = 60;

interface CommitNode {
  commit: Commit;
  x: number;
  y: number;
  color: string;
  branchIndex: number;
}

function computeLayout(state: GitState): CommitNode[] {
  // Assign each branch a column index
  const branchOrder = state.branches.map((b) => b.name);

  const nodes: CommitNode[] = [];

  // Sort commits by timestamp
  const sorted = [...state.commits].sort((a, b) => a.timestamp - b.timestamp);

  // Track the row for each commit
  sorted.forEach((commit, rowIndex) => {
    const branchIndex = branchOrder.indexOf(commit.branchName);
    const col = branchIndex >= 0 ? branchIndex : 0;

    nodes.push({
      commit,
      x: PADDING_LEFT + col * HORIZONTAL_GAP,
      y: PADDING_TOP + rowIndex * VERTICAL_GAP,
      color:
        state.branches.find((b) => b.name === commit.branchName)?.color ??
        "#7084FF",
      branchIndex: col,
    });
  });

  return nodes;
}

function getNodeById(nodes: CommitNode[], id: string): CommitNode | undefined {
  return nodes.find((n) => n.commit.id === id);
}

interface GitGraphProps {
  state: GitState;
}

export function GitGraph({ state }: GitGraphProps) {
  const nodes = computeLayout(state);
  const currentCommitId = getCurrentCommitId(state);

  const svgWidth = Math.max(
    400,
    PADDING_LEFT + (state.branches.length + 1) * HORIZONTAL_GAP,
  );
  const svgHeight = Math.max(
    300,
    PADDING_TOP + (state.commits.length + 1) * VERTICAL_GAP,
  );

  return (
    <div className="relative h-full w-full overflow-auto rounded-xl border border-border bg-elevated-bg">
      {/* Branch labels at top */}
      <div className="sticky top-0 z-10 flex gap-0 border-b border-border bg-elevated-bg/80 backdrop-blur-sm px-4 py-2">
        {state.branches.map((branch, i) => (
          <div
            key={branch.name}
            className="flex items-center gap-1.5"
            style={{
              marginLeft: i === 0 ? PADDING_LEFT - 16 : HORIZONTAL_GAP - 60,
            }}
          >
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: branch.color }}
            />
            <span
              className="font-mono text-[11px] font-medium"
              style={{ color: branch.color }}
            >
              {branch.name}
            </span>
            {state.head === branch.name && !state.isDetached && (
              <span className="ml-1 rounded-md bg-primary/20 px-1.5 py-0.5 font-mono text-[9px] text-primary">
                HEAD
              </span>
            )}
          </div>
        ))}
      </div>

      <svg width={svgWidth} height={svgHeight} className="block">
        {/* Connection lines */}
        {nodes.map((node) =>
          node.commit.parentIds.map((parentId) => {
            const parent = getNodeById(nodes, parentId);
            if (!parent) return null;

            const isMerge = node.commit.parentIds.length > 1;
            const isCrossBranch = parent.x !== node.x;

            if (isCrossBranch) {
              // Curved path for cross-branch connections
              const midY = (parent.y + node.y) / 2;
              return (
                <motion.path
                  key={`${parentId}-${node.commit.id}`}
                  d={`M ${parent.x} ${parent.y} C ${parent.x} ${midY}, ${node.x} ${midY}, ${node.x} ${node.y}`}
                  fill="none"
                  stroke={isMerge ? node.color : parent.color}
                  strokeWidth={2}
                  strokeDasharray={isMerge ? "6 3" : "none"}
                  opacity={0.6}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            }

            // Straight line for same-branch connections
            return (
              <motion.line
                key={`${parentId}-${node.commit.id}`}
                x1={parent.x}
                y1={parent.y}
                x2={node.x}
                y2={node.y}
                stroke={node.color}
                strokeWidth={2}
                opacity={0.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
            );
          }),
        )}

        {/* Commit nodes */}
        <AnimatePresence>
          {nodes.map((node) => {
            const isHead = node.commit.id === currentCommitId;
            return (
              <motion.g
                key={node.commit.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {/* Glow for HEAD */}
                {isHead && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_RADIUS + 8}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={1.5}
                    opacity={0.3}
                    animate={{
                      r: [NODE_RADIUS + 6, NODE_RADIUS + 10, NODE_RADIUS + 6],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}

                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_RADIUS}
                  fill={isHead ? node.color : "#0C1429"}
                  stroke={node.color}
                  strokeWidth={2.5}
                />

                {/* Commit hash */}
                <text
                  x={node.x + NODE_RADIUS + 10}
                  y={node.y - 6}
                  fill="#F4F5FB"
                  fontSize={11}
                  fontFamily="'Fira Code', monospace"
                  fontWeight={500}
                >
                  {node.commit.id}
                </text>

                {/* Commit message */}
                <text
                  x={node.x + NODE_RADIUS + 10}
                  y={node.y + 10}
                  fill="rgba(244, 245, 251, 0.72)"
                  fontSize={11}
                  fontFamily="'Manrope', sans-serif"
                >
                  {node.commit.message.length > 30
                    ? node.commit.message.slice(0, 30) + "..."
                    : node.commit.message}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
}
