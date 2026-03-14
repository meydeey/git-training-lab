"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitBranch, LifeBuoy, HelpCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  {
    name: "Simulateur",
    href: "/simulator",
    icon: GitBranch,
    description: "Visualise les commandes Git",
  },
  {
    name: "SOS Git",
    href: "/sos",
    icon: LifeBuoy,
    description: "Trouve la bonne commande",
  },
  {
    name: "Quiz",
    href: "/quiz",
    icon: HelpCircle,
    description: "Teste tes connaissances",
  },
  {
    name: "Glossaire",
    href: "/glossary",
    icon: BookOpen,
    description: "Termes Git animés",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-base-bg">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <GitBranch className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-text-primary">
            Git Training Lab
          </h1>
          <p className="font-mono text-[10px] text-primary-400">Le Labo IA</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <p className="mb-3 px-3 font-mono text-[10px] uppercase tracking-wider text-primary-400">
          Modules
        </p>
        <ul className="space-y-1">
          {modules.map((module) => {
            const isActive = pathname === module.href;
            const Icon = module.icon;
            return (
              <li key={module.href}>
                <Link
                  href={module.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(112,132,255,0.1)]"
                      : "text-text-secondary hover:-translate-y-0.5 hover:bg-elevated-bg hover:text-text-primary hover:shadow-[0_0_15px_rgba(112,132,255,0.05)]",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-text-secondary group-hover:text-primary-400",
                    )}
                  />
                  <div>
                    <p className="font-semibold">{module.name}</p>
                    <p
                      className={cn(
                        "text-[11px]",
                        isActive ? "text-primary-400" : "text-text-secondary",
                      )}
                    >
                      {module.description}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-6 py-4">
        <p className="font-mono text-[10px] text-text-secondary">
          Complément du cours Skool
        </p>
        <p className="font-mono text-[10px] text-primary-400">
          &quot;Git pour Claude Code&quot;
        </p>
      </div>
    </aside>
  );
}
