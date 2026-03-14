"use client";

import { motion } from "framer-motion";
import type { AnimationType } from "@/data/glossary-terms";

const COLORS = {
  primary: "#7084FF",
  success: "#34D399",
  warning: "#FBBF24",
  error: "#F87171",
  text: "#F4F5FB",
  textDim: "rgba(244,245,251,0.5)",
  bg: "#0C1429",
  surface: "#111B36",
  border: "rgba(244,245,251,0.1)",
};

interface TermAnimationProps {
  type: AnimationType;
  isPlaying: boolean;
}

export function TermAnimation({ type, isPlaying }: TermAnimationProps) {
  if (!isPlaying) return null;

  switch (type) {
    case "commit":
      return <CommitAnimation />;
    case "branch":
      return <BranchAnimation />;
    case "merge":
      return <MergeAnimation />;
    case "stash":
      return <StashAnimation />;
    case "head":
      return <HeadAnimation />;
    case "staging":
      return <StagingAnimation />;
    case "working-directory":
      return <WorkingDirectoryAnimation />;
    case "checkout":
      return <CheckoutAnimation />;
    case "reset":
      return <ResetAnimation />;
    case "revert":
      return <RevertAnimation />;
    case "diff":
      return <DiffAnimation />;
    case "worktree":
      return <WorktreeAnimation />;
    default:
      return null;
  }
}

function CommitAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      {/* Existing commits */}
      <circle
        cx={80}
        cy={100}
        r={12}
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth={2}
      />
      <circle
        cx={150}
        cy={100}
        r={12}
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth={2}
      />
      <line
        x1={92}
        y1={100}
        x2={138}
        y2={100}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.5}
      />

      {/* New commit appearing */}
      <motion.line
        x1={162}
        y1={100}
        x2={208}
        y2={100}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.circle
        cx={220}
        cy={100}
        r={12}
        fill={COLORS.primary}
        stroke={COLORS.primary}
        strokeWidth={2}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.8 }}
      />
      <motion.text
        x={220}
        y={75}
        textAnchor="middle"
        fill={COLORS.text}
        fontSize={11}
        fontFamily="'Fira Code', monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        nouveau
      </motion.text>
    </svg>
  );
}

function BranchAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      {/* Main line */}
      <line
        x1={60}
        y1={100}
        x2={240}
        y2={100}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.5}
      />
      <circle
        cx={80}
        cy={100}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth={2}
      />
      <circle
        cx={150}
        cy={100}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth={2}
      />
      <circle
        cx={220}
        cy={100}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth={2}
      />

      {/* Branch splitting off */}
      <motion.path
        d="M 150 100 C 170 100, 170 60, 200 60"
        fill="none"
        stroke={COLORS.success}
        strokeWidth={2}
        opacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <motion.circle
        cx={210}
        cy={60}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.success}
        strokeWidth={2}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 1 }}
      />
      <motion.text
        x={230}
        y={64}
        fill={COLORS.success}
        fontSize={10}
        fontFamily="'Fira Code', monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        feature
      </motion.text>
      <text
        x={230}
        y={104}
        fill={COLORS.primary}
        fontSize={10}
        fontFamily="'Fira Code', monospace"
      >
        main
      </text>
    </svg>
  );
}

function MergeAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      {/* Main branch */}
      <line
        x1={40}
        y1={120}
        x2={180}
        y2={120}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.5}
      />
      <circle
        cx={60}
        cy={120}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth={2}
      />
      <circle
        cx={120}
        cy={120}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth={2}
      />

      {/* Feature branch */}
      <path
        d="M 60 120 C 80 120, 80 70, 100 70"
        fill="none"
        stroke={COLORS.success}
        strokeWidth={2}
        opacity={0.5}
      />
      <line
        x1={100}
        y1={70}
        x2={170}
        y2={70}
        stroke={COLORS.success}
        strokeWidth={2}
        opacity={0.5}
      />
      <circle
        cx={110}
        cy={70}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.success}
        strokeWidth={2}
      />
      <circle
        cx={160}
        cy={70}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.success}
        strokeWidth={2}
      />

      {/* Merge lines converging */}
      <motion.path
        d="M 160 70 C 190 70, 210 95, 230 95"
        fill="none"
        stroke={COLORS.success}
        strokeWidth={2}
        opacity={0.5}
        strokeDasharray="6 3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.line
        x1={180}
        y1={120}
        x2={230}
        y2={95}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
      {/* Merge commit */}
      <motion.circle
        cx={230}
        cy={95}
        r={12}
        fill={COLORS.primary}
        stroke={COLORS.warning}
        strokeWidth={2.5}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 1 }}
      />
      <motion.text
        x={230}
        y={130}
        textAnchor="middle"
        fill={COLORS.warning}
        fontSize={10}
        fontFamily="'Fira Code', monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        merge
      </motion.text>
    </svg>
  );
}

function StashAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      {/* Files */}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={i}
          animate={{ y: [0, 40], opacity: [1, 0], scale: [1, 0.5] }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
        >
          <rect
            x={100 + i * 35}
            y={50}
            width={30}
            height={38}
            rx={4}
            fill={COLORS.surface}
            stroke={COLORS.warning}
            strokeWidth={1.5}
          />
          <text
            x={115 + i * 35}
            y={73}
            textAnchor="middle"
            fill={COLORS.textDim}
            fontSize={8}
            fontFamily="'Fira Code', monospace"
          >
            .{["js", "ts", "css"][i]}
          </text>
        </motion.g>
      ))}

      {/* Stash box */}
      <motion.rect
        x={90}
        y={120}
        width={120}
        height={50}
        rx={8}
        fill={COLORS.surface}
        stroke={COLORS.primary}
        strokeWidth={2}
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.text
        x={150}
        y={150}
        textAnchor="middle"
        fill={COLORS.primary}
        fontSize={11}
        fontFamily="'Fira Code', monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        stash@{"{0}"}
      </motion.text>
    </svg>
  );
}

function HeadAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      <line
        x1={50}
        y1={100}
        x2={250}
        y2={100}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.3}
      />
      {[80, 150, 220].map((x) => (
        <circle
          key={x}
          cx={x}
          cy={100}
          r={10}
          fill={COLORS.bg}
          stroke={COLORS.primary}
          strokeWidth={2}
        />
      ))}

      {/* HEAD pointer moving */}
      <motion.g
        animate={{ x: [0, 70, 140] }}
        transition={{ duration: 2, times: [0, 0.5, 1], delay: 0.5 }}
      >
        <polygon points="80,60 73,45 87,45" fill={COLORS.warning} />
        <text
          x={80}
          y={38}
          textAnchor="middle"
          fill={COLORS.warning}
          fontSize={10}
          fontFamily="'Fira Code', monospace"
          fontWeight={600}
        >
          HEAD
        </text>
      </motion.g>
    </svg>
  );
}

function StagingAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      {/* Working Dir zone */}
      <rect
        x={20}
        y={30}
        width={80}
        height={140}
        rx={8}
        fill={COLORS.surface}
        opacity={0.5}
      />
      <text
        x={60}
        y={22}
        textAnchor="middle"
        fill={COLORS.textDim}
        fontSize={9}
        fontFamily="'Fira Code', monospace"
      >
        working
      </text>

      {/* Staging zone */}
      <rect
        x={130}
        y={30}
        width={80}
        height={140}
        rx={8}
        fill={COLORS.surface}
        opacity={0.5}
      />
      <text
        x={170}
        y={22}
        textAnchor="middle"
        fill={COLORS.warning}
        fontSize={9}
        fontFamily="'Fira Code', monospace"
      >
        staging
      </text>

      {/* Committed zone */}
      <rect
        x={240}
        y={30}
        width={50}
        height={140}
        rx={8}
        fill={COLORS.surface}
        opacity={0.5}
      />
      <text
        x={265}
        y={22}
        textAnchor="middle"
        fill={COLORS.success}
        fontSize={9}
        fontFamily="'Fira Code', monospace"
      >
        commit
      </text>

      {/* File moving from working to staging */}
      <motion.rect
        width={24}
        height={30}
        rx={3}
        fill={COLORS.bg}
        stroke={COLORS.warning}
        strokeWidth={1.5}
        animate={{ x: [40, 158, 252], y: [70, 70, 70] }}
        transition={{ duration: 2.5, times: [0, 0.4, 1], delay: 0.5 }}
      />
    </svg>
  );
}

function WorkingDirectoryAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      {/* Folder */}
      <rect
        x={80}
        y={50}
        width={140}
        height={100}
        rx={8}
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth={1}
      />
      <path
        d="M 80 50 L 80 40 Q 80 35, 85 35 L 130 35 L 140 50"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth={1}
      />

      {/* Files appearing */}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.3 }}
        >
          <rect
            x={95}
            y={65 + i * 28}
            width={110}
            height={22}
            rx={4}
            fill={COLORS.bg}
          />
          <text
            x={105}
            y={80 + i * 28}
            fill={[COLORS.warning, COLORS.success, COLORS.error][i]}
            fontSize={10}
            fontFamily="'Fira Code', monospace"
          >
            {["M", "A", "D"][i]} {["app.js", "new.ts", "old.css"][i]}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function CheckoutAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      {/* Main branch */}
      <line
        x1={50}
        y1={120}
        x2={250}
        y2={120}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.4}
      />
      <circle
        cx={80}
        cy={120}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth={2}
      />
      <circle
        cx={150}
        cy={120}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth={2}
      />

      {/* Feature branch */}
      <path
        d="M 80 120 C 100 120, 100 70, 130 70"
        fill="none"
        stroke={COLORS.success}
        strokeWidth={2}
        opacity={0.4}
      />
      <line
        x1={130}
        y1={70}
        x2={230}
        y2={70}
        stroke={COLORS.success}
        strokeWidth={2}
        opacity={0.4}
      />
      <circle
        cx={150}
        cy={70}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.success}
        strokeWidth={2}
      />
      <circle
        cx={220}
        cy={70}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.success}
        strokeWidth={2}
      />

      {/* HEAD moving from main to feature */}
      <motion.g
        animate={{ x: [0, 0], y: [0, -50] }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <polygon points="150,95 143,82 157,82" fill={COLORS.warning} />
        <text
          x={150}
          y={76}
          textAnchor="middle"
          fill={COLORS.warning}
          fontSize={9}
          fontFamily="'Fira Code', monospace"
          fontWeight={600}
        >
          HEAD
        </text>
      </motion.g>
    </svg>
  );
}

function ResetAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      <line
        x1={30}
        y1={100}
        x2={270}
        y2={100}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.3}
      />
      {[60, 120, 180, 240].map((x) => (
        <circle
          key={x}
          cx={x}
          cy={100}
          r={10}
          fill={COLORS.bg}
          stroke={COLORS.primary}
          strokeWidth={2}
        />
      ))}

      {/* Commits fading out */}
      <motion.circle
        cx={180}
        cy={100}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.error}
        strokeWidth={2}
        animate={{ opacity: [1, 0.3] }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.circle
        cx={240}
        cy={100}
        r={10}
        fill={COLORS.bg}
        stroke={COLORS.error}
        strokeWidth={2}
        animate={{ opacity: [1, 0.3] }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />

      {/* Branch pointer moving back */}
      <motion.g
        animate={{ x: [120, 0] }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <polygon points="120,70 113,55 127,55" fill={COLORS.error} />
        <text
          x={120}
          y={48}
          textAnchor="middle"
          fill={COLORS.error}
          fontSize={9}
          fontFamily="'Fira Code', monospace"
        >
          reset
        </text>
      </motion.g>
    </svg>
  );
}

function RevertAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      <line
        x1={30}
        y1={100}
        x2={270}
        y2={100}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.3}
      />
      {[60, 120, 180].map((x) => (
        <circle
          key={x}
          cx={x}
          cy={100}
          r={10}
          fill={COLORS.bg}
          stroke={COLORS.primary}
          strokeWidth={2}
        />
      ))}

      {/* Crossed out commit */}
      <motion.line
        x1={170}
        y1={90}
        x2={190}
        y2={110}
        stroke={COLORS.error}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
      <motion.line
        x1={190}
        y1={90}
        x2={170}
        y2={110}
        stroke={COLORS.error}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      />

      {/* New revert commit */}
      <motion.line
        x1={192}
        y1={100}
        x2={228}
        y2={100}
        stroke={COLORS.primary}
        strokeWidth={2}
        opacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
      />
      <motion.circle
        cx={240}
        cy={100}
        r={12}
        fill={COLORS.success}
        stroke={COLORS.success}
        strokeWidth={2}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 1.3 }}
      />
      <motion.text
        x={240}
        y={78}
        textAnchor="middle"
        fill={COLORS.success}
        fontSize={9}
        fontFamily="'Fira Code', monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        revert
      </motion.text>
    </svg>
  );
}

function DiffAnimation() {
  const lines = [
    { text: "  const x = 1;", color: COLORS.textDim },
    { text: "- const y = 2;", color: COLORS.error },
    { text: "+ const y = 3;", color: COLORS.success },
    { text: "  return x + y;", color: COLORS.textDim },
  ];

  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      <rect
        x={40}
        y={30}
        width={220}
        height={140}
        rx={8}
        fill={COLORS.surface}
      />
      {lines.map((line, i) => (
        <motion.text
          key={i}
          x={55}
          y={65 + i * 28}
          fill={line.color}
          fontSize={12}
          fontFamily="'Fira Code', monospace"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.2 }}
        >
          {line.text}
        </motion.text>
      ))}
    </svg>
  );
}

function WorktreeAnimation() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      {/* Main worktree */}
      <rect
        x={30}
        y={40}
        width={100}
        height={120}
        rx={8}
        fill={COLORS.surface}
        stroke={COLORS.primary}
        strokeWidth={1.5}
      />
      <text
        x={80}
        y={30}
        textAnchor="middle"
        fill={COLORS.primary}
        fontSize={10}
        fontFamily="'Fira Code', monospace"
      >
        main
      </text>
      <rect x={45} y={60} width={70} height={14} rx={3} fill={COLORS.bg} />
      <rect x={45} y={80} width={70} height={14} rx={3} fill={COLORS.bg} />
      <rect x={45} y={100} width={70} height={14} rx={3} fill={COLORS.bg} />

      {/* Arrow */}
      <motion.path
        d="M 140 100 L 170 100"
        fill="none"
        stroke={COLORS.textDim}
        strokeWidth={1.5}
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill={COLORS.textDim} />
        </marker>
      </defs>

      {/* Second worktree */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <rect
          x={180}
          y={40}
          width={100}
          height={120}
          rx={8}
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth={1.5}
        />
        <text
          x={230}
          y={30}
          textAnchor="middle"
          fill={COLORS.success}
          fontSize={10}
          fontFamily="'Fira Code', monospace"
        >
          feature
        </text>
        <rect x={195} y={60} width={70} height={14} rx={3} fill={COLORS.bg} />
        <rect x={195} y={80} width={70} height={14} rx={3} fill={COLORS.bg} />
        <rect x={195} y={100} width={70} height={14} rx={3} fill={COLORS.bg} />
      </motion.g>
    </svg>
  );
}
