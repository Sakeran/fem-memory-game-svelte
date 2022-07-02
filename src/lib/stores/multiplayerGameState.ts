import { getContext } from "svelte";
import { Writable, writable } from "svelte/store";

type PlayerId = 0 | 1 | 2 | 3;
type PlayerScore = number;

interface MultiplayerGameState {
  activePlayer: PlayerId;
  playerScores: {
    [P in PlayerId]: PlayerScore;
  };
}

export const initMultiplayerGameState = () =>
  writable<MultiplayerGameState>({
    activePlayer: 0,
    playerScores: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
    },
  });

export const getMultiplayerGameState = () =>
  getContext("multiplayerGameState") as Writable<MultiplayerGameState>;
