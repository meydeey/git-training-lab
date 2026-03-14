export interface SosNode {
  id: string;
  question: string;
  icon: string;
  options?: SosOption[];
  solution?: SosSolution;
}

export interface SosOption {
  label: string;
  nextId: string;
}

export interface SosSolution {
  command: string;
  explanation: string;
  warning?: string;
}

export const sosTree: Record<string, SosNode> = {
  // Root situations
  root: {
    id: "root",
    question: "Quel est ton problème ?",
    icon: "help",
  },

  // Situation 1: Wrong files modified
  "wrong-files": {
    id: "wrong-files",
    question: "Claude Code a modifié les mauvais fichiers",
    icon: "file-x",
    options: [
      {
        label: "Je n'ai pas encore commité les changements",
        nextId: "wrong-files-uncommitted",
      },
      {
        label: "J'ai déjà commité les changements",
        nextId: "wrong-files-committed",
      },
    ],
  },
  "wrong-files-uncommitted": {
    id: "wrong-files-uncommitted",
    question: "",
    icon: "",
    solution: {
      command: "git checkout -- <fichier>",
      explanation:
        "Restaure le fichier à son état du dernier commit. Remplace <fichier> par le nom du fichier modifié. Pour restaurer tous les fichiers : git checkout -- .",
      warning: "Les modifications non commitées seront perdues définitivement.",
    },
  },
  "wrong-files-committed": {
    id: "wrong-files-committed",
    question: "",
    icon: "",
    solution: {
      command: "git reset --soft HEAD~1",
      explanation:
        "Annule le dernier commit mais garde les fichiers modifiés dans la staging area. Tu peux ensuite corriger et re-commiter.",
    },
  },

  // Situation 2: Wrong branch
  "wrong-branch": {
    id: "wrong-branch",
    question: "Je suis sur la mauvaise branche",
    icon: "git-branch",
    options: [
      {
        label: "J'ai des modifications non commitées",
        nextId: "wrong-branch-dirty",
      },
      {
        label: "Mon working directory est propre",
        nextId: "wrong-branch-clean",
      },
    ],
  },
  "wrong-branch-dirty": {
    id: "wrong-branch-dirty",
    question: "",
    icon: "",
    solution: {
      command: "git stash && git checkout <bonne-branche> && git stash pop",
      explanation:
        "Stash met tes modifications de côté, checkout change de branche, stash pop récupère tes modifications sur la bonne branche.",
    },
  },
  "wrong-branch-clean": {
    id: "wrong-branch-clean",
    question: "",
    icon: "",
    solution: {
      command: "git checkout <bonne-branche>",
      explanation:
        "Change simplement de branche. Si la branche n'existe pas encore : git checkout -b <nouvelle-branche>",
    },
  },

  // Situation 3: Undo last commit
  "undo-commit": {
    id: "undo-commit",
    question: "Je veux annuler le dernier commit",
    icon: "rotate-ccw",
    options: [
      {
        label: "Je veux garder les fichiers modifiés",
        nextId: "undo-commit-keep",
      },
      {
        label: "Je veux tout supprimer (revenir à l'état d'avant)",
        nextId: "undo-commit-discard",
      },
    ],
  },
  "undo-commit-keep": {
    id: "undo-commit-keep",
    question: "",
    icon: "",
    solution: {
      command: "git reset --soft HEAD~1",
      explanation:
        "Annule le commit mais conserve tous les fichiers modifiés dans la staging area. Parfait pour corriger un message de commit ou ajouter des fichiers oubliés.",
    },
  },
  "undo-commit-discard": {
    id: "undo-commit-discard",
    question: "",
    icon: "",
    solution: {
      command: "git reset --hard HEAD~1",
      explanation:
        "Annule le commit ET supprime toutes les modifications. Le repo revient exactement à l'état du commit précédent.",
      warning:
        "Toutes les modifications du dernier commit seront perdues définitivement. Utilise --soft si tu n'es pas sûr.",
    },
  },

  // Situation 4: Unsaved changes, need to switch
  "unsaved-changes": {
    id: "unsaved-changes",
    question:
      "J'ai des modifications non sauvegardées et je dois changer de branche",
    icon: "archive",
    options: [
      {
        label: "Je veux garder mes modifications pour plus tard",
        nextId: "unsaved-stash",
      },
      {
        label: "Je veux commiter rapidement avant de changer",
        nextId: "unsaved-commit",
      },
    ],
  },
  "unsaved-stash": {
    id: "unsaved-stash",
    question: "",
    icon: "",
    solution: {
      command: "git stash",
      explanation:
        "Met toutes tes modifications de côté dans le stash. Quand tu reviens sur cette branche, fais git stash pop pour les récupérer.",
    },
  },
  "unsaved-commit": {
    id: "unsaved-commit",
    question: "",
    icon: "",
    solution: {
      command: 'git add -A && git commit -m "WIP: travail en cours"',
      explanation:
        "Commite tout en mode brouillon. Tu pourras modifier ce commit plus tard avec git commit --amend.",
    },
  },

  // Situation 5: Merge broke everything
  "merge-broken": {
    id: "merge-broken",
    question: "Mon merge a tout cassé",
    icon: "git-merge",
    options: [
      {
        label: "Le merge n'est pas encore terminé (en cours de résolution)",
        nextId: "merge-abort",
      },
      {
        label: "Le merge est terminé et commité",
        nextId: "merge-revert",
      },
    ],
  },
  "merge-abort": {
    id: "merge-abort",
    question: "",
    icon: "",
    solution: {
      command: "git merge --abort",
      explanation:
        "Annule le merge en cours et revient à l'état d'avant. Comme si le merge n'avait jamais eu lieu.",
    },
  },
  "merge-revert": {
    id: "merge-revert",
    question: "",
    icon: "",
    solution: {
      command: "git reset --hard HEAD~1",
      explanation:
        "Supprime le commit de merge et revient au commit précédent. Toutes les modifications du merge sont perdues.",
      warning:
        "Si le merge a été pushé sur le remote, utilise plutôt git revert -m 1 HEAD pour créer un commit d'annulation.",
    },
  },

  // Situation 6: See what changed
  "see-changes": {
    id: "see-changes",
    question: "Je veux voir ce qui a changé",
    icon: "eye",
    options: [
      {
        label: "Voir les modifications non commitées",
        nextId: "see-diff",
      },
      {
        label: "Voir l'historique des commits",
        nextId: "see-log",
      },
    ],
  },
  "see-diff": {
    id: "see-diff",
    question: "",
    icon: "",
    solution: {
      command: "git diff",
      explanation:
        "Affiche les modifications ligne par ligne. Pour voir aussi les fichiers stagés : git diff --staged",
    },
  },
  "see-log": {
    id: "see-log",
    question: "",
    icon: "",
    solution: {
      command: "git log --oneline -10",
      explanation:
        "Affiche les 10 derniers commits en format compact. Pour voir un commit en détail : git show <hash>",
    },
  },
};

export const rootSituations = [
  "wrong-files",
  "wrong-branch",
  "undo-commit",
  "unsaved-changes",
  "merge-broken",
  "see-changes",
] as const;
