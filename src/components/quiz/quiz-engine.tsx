"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { quizScenarios } from "@/data/quiz-scenarios";
import { ScenarioView } from "./scenario-view";

const difficultyLabels = {
  basic: "Basique",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

const difficultyColors = {
  basic: "text-success",
  intermediate: "text-warning",
  advanced: "text-error",
};

export function QuizEngine() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizScenarios.length).fill(null),
  );

  const scenario = quizScenarios[currentIndex];
  const isAnswered = selectedOption !== null;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
    if (index === scenario.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizScenarios.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
    setAnswers(new Array(quizScenarios.length).fill(null));
  };

  if (isFinished) {
    const percentage = Math.round((score / quizScenarios.length) * 100);
    let message = "";
    let messageColor = "";
    if (score <= 3) {
      message = "Révise le cours Git sur Skool, tu vas progresser !";
      messageColor = "text-error";
    } else if (score <= 6) {
      message = "Pas mal ! Tu maîtrises les bases, continue à pratiquer.";
      messageColor = "text-warning";
    } else if (score <= 9) {
      message = "Solide ! Tu comprends bien Git.";
      messageColor = "text-success";
    } else {
      message = "Expert Git ! Rien ne t'échappe.";
      messageColor = "text-primary";
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 py-12"
      >
        <Trophy className="h-16 w-16 text-warning" />
        <div className="text-center">
          <p className="text-4xl font-bold text-text-primary">
            {score}/{quizScenarios.length}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {percentage}% de bonnes réponses
          </p>
        </div>
        <p className={`text-center text-lg font-semibold ${messageColor}`}>
          {message}
        </p>
        <button
          onClick={handleRestart}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(112,132,255,0.3)]"
        >
          <RotateCcw className="h-4 w-4" />
          Recommencer
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-elevated-bg overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{
              width: `${((currentIndex + (isAnswered ? 1 : 0)) / quizScenarios.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="font-mono text-xs text-text-secondary">
          {currentIndex + 1}/{quizScenarios.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          {/* Difficulty badge */}
          <div className="mb-4 flex items-center gap-2">
            <span
              className={`font-mono text-[10px] uppercase tracking-wider ${difficultyColors[scenario.difficulty]}`}
            >
              {difficultyLabels[scenario.difficulty]}
            </span>
            <span className="text-text-secondary">—</span>
            <span className="text-sm text-text-secondary">
              Question {scenario.id}
            </span>
          </div>

          {/* Description */}
          <p className="mb-6 text-base font-semibold text-text-primary">
            {scenario.description}
          </p>

          {/* Before / After */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <ScenarioView state={scenario.before} label="Avant" />
            <ScenarioView state={scenario.after} label="Après" />
          </div>

          {/* Question */}
          <p className="mb-4 text-sm font-medium text-primary-400">
            Quelle commande a produit ce changement ?
          </p>

          {/* Options */}
          <div className="space-y-2">
            {scenario.options.map((option, index) => {
              let borderColor = "border-border";
              let bgColor = "bg-elevated-bg";
              let icon = null;

              if (isAnswered) {
                if (index === scenario.correctIndex) {
                  borderColor = "border-success";
                  bgColor = "bg-success/5";
                  icon = (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                  );
                } else if (index === selectedOption) {
                  borderColor = "border-error";
                  bgColor = "bg-error/5";
                  icon = <XCircle className="h-4 w-4 shrink-0 text-error" />;
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={isAnswered}
                  className={`flex w-full items-start gap-3 rounded-xl border ${borderColor} ${bgColor} p-4 text-left transition-all ${
                    !isAnswered
                      ? "hover:-translate-y-0.5 hover:border-border-accent hover:shadow-[0_0_15px_rgba(112,132,255,0.1)]"
                      : ""
                  }`}
                >
                  {icon}
                  <div>
                    <code className="font-mono text-sm text-text-primary">
                      {option.command}
                    </code>
                    {isAnswered && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 text-xs leading-relaxed text-text-secondary"
                      >
                        {option.explanation}
                      </motion.p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next button */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-end"
            >
              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(112,132,255,0.3)]"
              >
                {currentIndex < quizScenarios.length - 1
                  ? "Suivant"
                  : "Voir le résultat"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
