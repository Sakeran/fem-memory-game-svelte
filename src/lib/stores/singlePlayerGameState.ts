import { getContext } from "svelte";
import { Writable, writable } from "svelte/store";

interface SinglePlayerGameState {
  timeInSeconds: number;
  timerStarted: boolean;
  movesMade: number;
}

export const initSinglePlayerGameState = () =>
  writable<SinglePlayerGameState>({
    timeInSeconds: 0,
    movesMade: 0,
    timerStarted: false,
  });

export const getSinglePlayerGameState = () =>
  getContext("singlePlayerGameState") as Writable<SinglePlayerGameState>;
