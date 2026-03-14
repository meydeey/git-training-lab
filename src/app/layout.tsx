import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Git Training Lab — Le Labo IA",
  description:
    "Terrain d'entraînement Git interactif pour les membres ELITE Le Labo IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {/* Small screen warning */}
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-deep-bg p-8 text-center lg:hidden">
          <div>
            <p className="text-lg font-bold text-text-primary">
              Cet outil est optimisé pour desktop
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Utilise un écran d&apos;au moins 1024px de large pour une
              meilleure expérience.
            </p>
          </div>
        </div>
        <div className="hidden lg:block">
          <Sidebar />
          <main className="ml-64 min-h-screen relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
