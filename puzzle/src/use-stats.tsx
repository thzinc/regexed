import { useEffect, useRef, useState } from "react";
import { GameState, RecordedGame } from "./types";
import { MAX_ATTEMPTS } from "./use-game";

export function useStats() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [played, setPlayed] = useState<number>(0);
  const [winRate, setWinRate] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [attemptCounts, setAttemptCounts] = useState<number[]>([]);

  useEffect(() => {
    let played: number = 0;
    let won: number = 0;
    let currentStreak: number = 0;
    let bestStreak: number = 0;
    let wonLastGame = true;
    let attemptCounts: number[] = Array.from({ length: MAX_ATTEMPTS }, () => 0);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith("puzzles/")) continue;

      const recordedGameString = localStorage.getItem(key);
      if (!recordedGameString) continue;

      const recordedGame = JSON.parse(recordedGameString) as RecordedGame;
      if (!recordedGame) continue;
      if (recordedGame.gameState === GameState.Incomplete) continue;

      played += 1;
      if (recordedGame.gameState === GameState.Won) {
        won += 1;
        if (wonLastGame) {
          currentStreak += 1;
        }
        wonLastGame = true;
      } else {
        wonLastGame = false;
        currentStreak = 0;
      }

      bestStreak = Math.max(bestStreak, currentStreak);

      const attemptCount = recordedGame.attempts.length - 1;
      attemptCounts[attemptCount] = (attemptCounts[attemptCount] || 0) + 1;
    }

    const winRate = played > 0 ? won / played : 0;

    setPlayed(played);
    setWinRate(winRate);
    setCurrentStreak(currentStreak);
    setBestStreak(bestStreak);
    setAttemptCounts(attemptCounts);
  }, []);
  return {
    showModal: () => modalRef.current?.showModal(),
    closeModal: () => modalRef.current?.close(),
    modalRef,
    hasStats: played > 0,
    played,
    winRate,
    currentStreak,
    bestStreak,
    attemptCounts,
    highestAttemptCount: attemptCounts.reduce(
      (max, attemptCount) => Math.max(max, attemptCount),
      0
    ),
  };
}
