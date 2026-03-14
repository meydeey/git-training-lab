export const theme = {
  colors: {
    deepBg: "#030712",
    baseBg: "#070D1F",
    elevatedBg: "#0C1429",
    surfaceBg: "#111B36",
    primary: "#7084FF",
    primary400: "#8B9CFF",
    primaryGlow: "rgba(112, 132, 255, 0.20)",
    textPrimary: "#F4F5FB",
    textSecondary: "rgba(244, 245, 251, 0.72)",
    border: "rgba(244, 245, 251, 0.10)",
    borderAccent: "rgba(112, 132, 255, 0.20)",
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
  },
  // Branch colors for the git graph
  branchColors: [
    "#7084FF", // main — primary blue
    "#34D399", // green
    "#FBBF24", // yellow
    "#F87171", // red
    "#A78BFA", // purple
    "#FB923C", // orange
    "#2DD4BF", // teal
    "#F472B6", // pink
  ],
} as const;
