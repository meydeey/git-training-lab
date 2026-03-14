export interface GlossaryTerm {
  id: string;
  name: string;
  description: string;
  animationType: AnimationType;
}

export type AnimationType =
  | "commit"
  | "branch"
  | "merge"
  | "stash"
  | "head"
  | "staging"
  | "working-directory"
  | "checkout"
  | "reset"
  | "revert"
  | "diff"
  | "worktree";

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "commit",
    name: "Commit",
    description:
      "Un instantané de ton code à un moment donné. Chaque commit a un identifiant unique et pointe vers son parent.",
    animationType: "commit",
  },
  {
    id: "branch",
    name: "Branch",
    description:
      "Une ligne de développement indépendante. C'est juste un pointeur vers un commit.",
    animationType: "branch",
  },
  {
    id: "merge",
    name: "Merge",
    description:
      "Combine le travail de deux branches en créant un commit de fusion avec deux parents.",
    animationType: "merge",
  },
  {
    id: "stash",
    name: "Stash",
    description:
      "Met de côté tes modifications en cours sans les commiter. Comme une étagère temporaire.",
    animationType: "stash",
  },
  {
    id: "head",
    name: "HEAD",
    description:
      "Le pointeur qui indique où tu te trouves dans l'historique. Généralement, il pointe vers une branche.",
    animationType: "head",
  },
  {
    id: "staging",
    name: "Staging Area",
    description:
      "La zone de préparation entre le working directory et le commit. Tu y places les fichiers prêts à être commités.",
    animationType: "staging",
  },
  {
    id: "working-directory",
    name: "Working Directory",
    description:
      "Le dossier de ton projet tel que tu le vois. C'est là que tu modifies tes fichiers avant de les stager.",
    animationType: "working-directory",
  },
  {
    id: "checkout",
    name: "Checkout",
    description:
      "Déplace HEAD vers une autre branche ou un autre commit. Change les fichiers de ton working directory.",
    animationType: "checkout",
  },
  {
    id: "reset",
    name: "Reset",
    description:
      "Recule la branche courante vers un commit précédent. Trois modes : soft, mixed, hard.",
    animationType: "reset",
  },
  {
    id: "revert",
    name: "Revert",
    description:
      "Crée un nouveau commit qui annule les changements d'un commit précédent. Plus sûr que reset.",
    animationType: "revert",
  },
  {
    id: "diff",
    name: "Diff",
    description:
      "Affiche les différences entre deux états : entre fichiers modifiés et staged, entre commits, etc.",
    animationType: "diff",
  },
  {
    id: "worktree",
    name: "Worktree",
    description:
      "Un second working directory lié au même repo. Permet de travailler sur deux branches en parallèle.",
    animationType: "worktree",
  },
];
