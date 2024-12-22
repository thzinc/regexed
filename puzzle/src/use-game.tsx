import { useCallback, useEffect, useState } from "react";
import {
  ChallengeMatch,
  GameAttempt,
  GameChallenge,
  GameChallengeResult,
  GameState,
  Puzzle,
  RecordedGame,
} from "./types";

export const MAX_ATTEMPTS = 6;

interface Game {
  attempt: (pattern: RegExp, source: string) => void;
  attempts: GameAttempt[];
  gameChallenges: GameChallenge[];
  gameState: GameState;
  remainingAttempts: number;
  setPattern: (pattern?: RegExp) => void;
}

const CURRENT_RECORDED_GAME_VERSION = "1.0.0";

export function useGame({ puzzleNumber, challenges }: Puzzle): Game {
  const localStorageKey = `puzzles/${puzzleNumber}`;
  const [pattern, setPattern] = useState<RegExp>();
  const [attempts, setAttempts] = useState<GameAttempt[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.Incomplete);
  const [challengeMatches, setChallengeMatches] = useState<ChallengeMatch[]>(
    []
  );
  const [revealedChallengeIndex, setRevealedChallengeIndex] =
    useState<number>(-1);
  const [gameChallenges, setGameChallenges] = useState<GameChallenge[]>([]);
  const [remainingAttempts, setRemainingAttempts] =
    useState<number>(MAX_ATTEMPTS);

  const updateRemainingAttempts = useCallback((attempts: GameAttempt[]) => {
    setRemainingAttempts(MAX_ATTEMPTS - attempts.length);
  }, []);

  useEffect(() => {
    const recordedGameString = localStorage.getItem(localStorageKey);
    if (!recordedGameString) return;

    const { attempts, gameState, revealedChallengeIndex } = JSON.parse(
      recordedGameString
    ) as RecordedGame;
    setAttempts(attempts);
    setGameState(gameState);
    setRevealedChallengeIndex(revealedChallengeIndex);
    updateRemainingAttempts(attempts);
  }, [localStorageKey, updateRemainingAttempts]);

  const recordGame = useCallback(
    (
      revealedChallengeIndex: number,
      attempts: GameAttempt[],
      gameState: GameState
    ) => {
      const recordedGame: RecordedGame = {
        revealedChallengeIndex,
        attempts,
        gameState,
        updatedAt: new Date().toISOString(),
        puzzleNumber,
        version: CURRENT_RECORDED_GAME_VERSION,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(recordedGame));

      setRevealedChallengeIndex(revealedChallengeIndex);
      setAttempts(attempts);
      setGameState(gameState);
      updateRemainingAttempts(attempts);
    },
    [localStorageKey, puzzleNumber, updateRemainingAttempts]
  );

  useEffect(() => {
    setChallengeMatches(
      challenges.map((challenge) => {
        const { haystack, needle } = challenge;
        const results = pattern?.exec(haystack);
        if (results && results.length > 0) {
          const [found] = results;

          let matched = false;
          if (challenge.needle instanceof Array) {
            matched = needle.includes(found);
          } else {
            matched = found === needle;
          }

          return {
            matched,
            prefix: haystack.slice(0, results.index),
            highlight: haystack.slice(
              results.index,
              results.index + found.length
            ),
            suffix: haystack.slice(results.index + found.length),
          };
        }

        return {
          matched: false,
          prefix: haystack,
          highlight: "",
          suffix: "",
        };
      })
    );
  }, [pattern, challenges]);

  useEffect(() => {
    setGameChallenges(
      challenges.map((challenge, i) => ({
        ...challenge,
        ...challengeMatches[i],
        revealed: i <= revealedChallengeIndex,
      }))
    );
  }, [challenges, challengeMatches, revealedChallengeIndex]);

  const attempt = useCallback(
    (pattern: RegExp, source: string) => {
      if (gameState !== GameState.Incomplete) return;

      const { i: lastConsecutiveMatchIndex } = gameChallenges.reduce(
        (prev, gc, i) => {
          if (!prev.cont) return prev;

          if (!gc.matched) {
            return {
              ...prev,
              cont: false,
            };
          }

          return {
            i,
            cont: true,
          };
        },
        { i: -1, cont: true }
      );
      const nextRevealedChallengeIndex = Math.min(
        Math.max(lastConsecutiveMatchIndex + 1, attempts.length),
        gameChallenges.length - 1
      );
      const nextAttempts = [
        ...attempts,
        {
          pattern,
          source,
          results: gameChallenges.map((gc, i) => {
            if (nextRevealedChallengeIndex < i)
              return GameChallengeResult.NotAttempted;
            if (gc.matched) return GameChallengeResult.Passed;
            return GameChallengeResult.Failed;
          }),
        },
      ];

      const nextGameState = (function () {
        if (gameChallenges.every((gc) => gc.matched)) {
          return GameState.Won;
        } else if (nextAttempts.length < MAX_ATTEMPTS) {
          return GameState.Incomplete;
        } else {
          return GameState.Lost;
        }
      })();

      recordGame(nextRevealedChallengeIndex, nextAttempts, nextGameState);
    },
    [attempts, gameChallenges, gameState, recordGame]
  );

  return {
    attempt,
    attempts,
    gameChallenges,
    gameState,
    remainingAttempts,
    setPattern,
  };
}
