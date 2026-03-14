export interface QuizScenario {
  id: number;
  description: string;
  before: ScenarioState;
  after: ScenarioState;
  options: QuizOption[];
  correctIndex: number;
  difficulty: "basic" | "intermediate" | "advanced";
}

export interface ScenarioState {
  branches: { name: string; commits: string[]; color: string }[];
  head: string;
}

export interface QuizOption {
  command: string;
  explanation: string;
}

export const quizScenarios: QuizScenario[] = [
  // 1-3: Basic
  {
    id: 1,
    description: "Un nouveau noeud est apparu sur la branche main.",
    difficulty: "basic",
    before: {
      branches: [{ name: "main", commits: ["A", "B"], color: "#7084FF" }],
      head: "main",
    },
    after: {
      branches: [{ name: "main", commits: ["A", "B", "C"], color: "#7084FF" }],
      head: "main",
    },
    options: [
      {
        command: 'git commit -m "C"',
        explanation:
          "Correct ! Un commit ajoute un nouveau noeud sur la branche courante.",
      },
      {
        command: "git branch C",
        explanation:
          "Non, git branch crée une nouvelle branche, pas un commit.",
      },
      {
        command: "git merge C",
        explanation: "Non, merge fusionne une branche existante.",
      },
      {
        command: "git stash",
        explanation:
          "Non, stash met de côté les modifications sans les commiter.",
      },
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    description:
      "Une nouvelle branche 'feature' est apparue au même niveau que main.",
    difficulty: "basic",
    before: {
      branches: [{ name: "main", commits: ["A", "B", "C"], color: "#7084FF" }],
      head: "main",
    },
    after: {
      branches: [
        { name: "main", commits: ["A", "B", "C"], color: "#7084FF" },
        { name: "feature", commits: ["A", "B", "C"], color: "#34D399" },
      ],
      head: "main",
    },
    options: [
      {
        command: "git checkout feature",
        explanation:
          "Non, checkout change de branche mais ne la crée pas (sauf avec -b).",
      },
      {
        command: "git merge feature",
        explanation: "Non, merge fusionne une branche qui doit déjà exister.",
      },
      {
        command: "git branch feature",
        explanation:
          "Correct ! git branch crée une nouvelle branche pointant vers le commit actuel.",
      },
      {
        command: 'git commit -m "feature"',
        explanation: "Non, commit crée un nouveau noeud, pas une branche.",
      },
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    description: "HEAD est passé de main à feature.",
    difficulty: "basic",
    before: {
      branches: [
        { name: "main", commits: ["A", "B", "C"], color: "#7084FF" },
        { name: "feature", commits: ["A", "B", "C"], color: "#34D399" },
      ],
      head: "main",
    },
    after: {
      branches: [
        { name: "main", commits: ["A", "B", "C"], color: "#7084FF" },
        { name: "feature", commits: ["A", "B", "C"], color: "#34D399" },
      ],
      head: "feature",
    },
    options: [
      {
        command: "git branch feature",
        explanation: "Non, branch crée une branche, elle ne change pas HEAD.",
      },
      {
        command: "git checkout feature",
        explanation:
          "Correct ! checkout déplace HEAD vers la branche spécifiée.",
      },
      {
        command: "git merge feature",
        explanation: "Non, merge fusionne feature dans la branche courante.",
      },
      {
        command: "git reset feature",
        explanation:
          "Non, reset déplace le pointeur de branche, pas HEAD vers une autre branche.",
      },
    ],
    correctIndex: 1,
  },

  // 4-6: Intermediate
  {
    id: 4,
    description:
      "Les commits de feature ont été intégrés dans main avec un commit de merge.",
    difficulty: "intermediate",
    before: {
      branches: [
        { name: "main", commits: ["A", "B"], color: "#7084FF" },
        { name: "feature", commits: ["A", "C", "D"], color: "#34D399" },
      ],
      head: "main",
    },
    after: {
      branches: [
        { name: "main", commits: ["A", "B", "M"], color: "#7084FF" },
        { name: "feature", commits: ["A", "C", "D"], color: "#34D399" },
      ],
      head: "main",
    },
    options: [
      {
        command: "git merge feature",
        explanation:
          "Correct ! merge intègre les commits de feature dans main avec un commit de fusion.",
      },
      {
        command: "git checkout feature",
        explanation: "Non, checkout change juste de branche active.",
      },
      {
        command: "git rebase feature",
        explanation:
          "Non, rebase réécrit l'historique au lieu de créer un commit de merge.",
      },
      {
        command: "git branch -d feature",
        explanation: "Non, cette commande supprime la branche.",
      },
    ],
    correctIndex: 0,
  },
  {
    id: 5,
    description: "Les fichiers modifiés ont disparu du working directory.",
    difficulty: "intermediate",
    before: {
      branches: [{ name: "main", commits: ["A", "B"], color: "#7084FF" }],
      head: "main",
    },
    after: {
      branches: [{ name: "main", commits: ["A", "B"], color: "#7084FF" }],
      head: "main",
    },
    options: [
      {
        command: "git reset --hard HEAD",
        explanation:
          "Non, reset --hard supprimerait les modifications définitivement.",
      },
      {
        command: 'git commit -m "save"',
        explanation:
          "Non, commit les aurait sauvegardées dans un nouveau noeud visible.",
      },
      {
        command: "git checkout -- .",
        explanation:
          "Non, checkout -- restaure les fichiers et perd les modifications.",
      },
      {
        command: "git stash",
        explanation:
          "Correct ! stash met les modifications de côté sans les supprimer définitivement.",
      },
    ],
    correctIndex: 3,
  },
  {
    id: 6,
    description:
      "Après un stash, les fichiers modifiés sont réapparus dans le working directory.",
    difficulty: "intermediate",
    before: {
      branches: [{ name: "main", commits: ["A", "B"], color: "#7084FF" }],
      head: "main",
    },
    after: {
      branches: [{ name: "main", commits: ["A", "B"], color: "#7084FF" }],
      head: "main",
    },
    options: [
      {
        command: "git stash",
        explanation: "Non, stash les mettrait de côté, pas les récupérerait.",
      },
      {
        command: "git stash pop",
        explanation:
          "Correct ! stash pop récupère les modifications mises de côté et les remet dans le working directory.",
      },
      {
        command: "git checkout .",
        explanation:
          "Non, checkout restaurerait les fichiers à leur état commité.",
      },
      {
        command: "git reset --mixed HEAD",
        explanation: "Non, reset --mixed ne touche pas au stash.",
      },
    ],
    correctIndex: 1,
  },

  // 7-9: Advanced
  {
    id: 7,
    description:
      "La branche main est revenue au commit B, mais les fichiers de C sont encore dans la staging area.",
    difficulty: "advanced",
    before: {
      branches: [{ name: "main", commits: ["A", "B", "C"], color: "#7084FF" }],
      head: "main",
    },
    after: {
      branches: [{ name: "main", commits: ["A", "B"], color: "#7084FF" }],
      head: "main",
    },
    options: [
      {
        command: "git reset --hard HEAD~1",
        explanation:
          "Non, --hard supprimerait aussi les fichiers du working directory et de la staging area.",
      },
      {
        command: "git revert HEAD",
        explanation:
          "Non, revert crée un nouveau commit d'annulation, il ne recule pas la branche.",
      },
      {
        command: "git reset --soft HEAD~1",
        explanation:
          "Correct ! reset --soft recule la branche mais garde les modifications dans la staging area.",
      },
      {
        command: "git reset --mixed HEAD~1",
        explanation:
          "Non, --mixed garderait les fichiers dans le working directory mais pas dans la staging area.",
      },
    ],
    correctIndex: 2,
  },
  {
    id: 8,
    description:
      "La branche main a reculé au commit A et toutes les modifications ont disparu.",
    difficulty: "advanced",
    before: {
      branches: [{ name: "main", commits: ["A", "B", "C"], color: "#7084FF" }],
      head: "main",
    },
    after: {
      branches: [{ name: "main", commits: ["A"], color: "#7084FF" }],
      head: "main",
    },
    options: [
      {
        command: "git reset --hard HEAD~2",
        explanation:
          "Correct ! reset --hard recule de 2 commits et supprime toutes les modifications.",
      },
      {
        command: "git reset --soft HEAD~2",
        explanation:
          "Non, --soft garderait les modifications dans la staging area.",
      },
      {
        command: "git checkout A",
        explanation:
          "Non, checkout mettrait HEAD en mode détaché sans modifier la branche.",
      },
      {
        command: "git revert HEAD~2",
        explanation:
          "Non, revert crée de nouveaux commits, il ne supprime pas l'historique.",
      },
    ],
    correctIndex: 0,
  },
  {
    id: 9,
    description:
      "Les fichiers du stash sont revenus dans le working directory après un changement de branche.",
    difficulty: "advanced",
    before: {
      branches: [
        { name: "main", commits: ["A", "B"], color: "#7084FF" },
        { name: "feature", commits: ["A", "B", "C"], color: "#34D399" },
      ],
      head: "main",
    },
    after: {
      branches: [
        { name: "main", commits: ["A", "B"], color: "#7084FF" },
        { name: "feature", commits: ["A", "B", "C"], color: "#34D399" },
      ],
      head: "feature",
    },
    options: [
      {
        command: "git checkout feature",
        explanation:
          "Non, sans stash les modifications non commitées pourraient être perdues ou empêcher le checkout.",
      },
      {
        command: "git merge feature && git stash pop",
        explanation:
          "Non, merge fusionne les branches, ce n'est pas ce qui s'est passé ici.",
      },
      {
        command: "git reset --soft feature",
        explanation:
          "Non, reset --soft ne change pas de branche de cette façon.",
      },
      {
        command: "git stash && git checkout feature && git stash pop",
        explanation:
          "Correct ! stash sauvegarde, checkout change de branche, stash pop restaure les fichiers.",
      },
    ],
    correctIndex: 3,
  },

  // 10: Trap question
  {
    id: 10,
    description:
      "HEAD pointe directement vers un commit, pas vers une branche. Le label HEAD est affiché seul, sans nom de branche.",
    difficulty: "advanced",
    before: {
      branches: [{ name: "main", commits: ["A", "B", "C"], color: "#7084FF" }],
      head: "main",
    },
    after: {
      branches: [{ name: "main", commits: ["A", "B", "C"], color: "#7084FF" }],
      head: "B",
    },
    options: [
      {
        command: "git reset --hard B",
        explanation:
          "Non, reset --hard déplacerait la branche main vers B, HEAD resterait attaché à main.",
      },
      {
        command: "git checkout B",
        explanation:
          "Correct ! Checkout vers un commit (pas une branche) met HEAD en mode détaché — c'est le fameux 'detached HEAD'.",
      },
      {
        command: "git branch -d main",
        explanation:
          "Non, supprimer main ne mettrait pas HEAD en mode détaché de cette façon.",
      },
      {
        command: "git stash",
        explanation: "Non, stash ne change pas la position de HEAD.",
      },
    ],
    correctIndex: 1,
  },
];
