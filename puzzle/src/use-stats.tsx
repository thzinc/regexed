import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { GameState, RecordedGame } from "./types";
import { MAX_ATTEMPTS } from "./use-game";

interface Stats {
  showModal: () => void;
  closeModal: () => void;
  modalRef: RefObject<HTMLDialogElement>;
  loading: boolean;
  hasStats: boolean;
  played: number;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
  attemptCounts: number[];
  hasCompletedLatestPuzzle: boolean;
}

export function useStats(latestPuzzleNumber?: string): Stats {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [played, setPlayed] = useState<number>(0);
  const [winRate, setWinRate] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [attemptCounts, setAttemptCounts] = useState<number[]>([]);
  const [hasCompletedLatestPuzzle, setHasCompletedLatestPuzzle] =
    useState<boolean>(false);

  const fetchCompletedGames = useCallback(() => {
    const completedGames: RecordedGame[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith("puzzles/")) continue;

      const recordedGameString = localStorage.getItem(key);
      if (!recordedGameString) continue;

      const recordedGame = JSON.parse(recordedGameString) as RecordedGame;
      if (!recordedGame) continue;
      if (recordedGame.gameState === GameState.Incomplete) continue;

      completedGames.push(recordedGame);
    }

    completedGames.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));

    return completedGames;
  }, []);

  useEffect(() => {
    let played: number = 0;
    let won: number = 0;
    let currentStreak: number = 0;
    let bestStreak: number = 0;
    let wonLastGame = true;
    let attemptCounts: number[] = Array.from({ length: MAX_ATTEMPTS }, () => 0);
    for (const recordedGame of fetchCompletedGames()) {
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

      if (recordedGame.puzzleNumber === latestPuzzleNumber) {
        setHasCompletedLatestPuzzle(true);
      }
    }

    const winRate = played > 0 ? won / played : 0;

    setPlayed(played);
    setWinRate(winRate);
    setCurrentStreak(currentStreak);
    setBestStreak(bestStreak);
    setAttemptCounts(attemptCounts);
    setLoading(false);
  }, [fetchCompletedGames, latestPuzzleNumber]);

  return {
    showModal: () => modalRef.current?.showModal(),
    closeModal: () => modalRef.current?.close(),
    modalRef,
    loading,
    hasStats: played > 0,
    played,
    winRate,
    currentStreak,
    bestStreak,
    attemptCounts,
    hasCompletedLatestPuzzle,
  };
}
