import { getContext } from "svelte";
import { Writable, writable } from "svelte/store";

export interface GameOptions {
  size: 4 | 6;
  icons: boolean;
  playerCount: 1 | 2 | 3 | 4;
}

const initialOptions: GameOptions = {
  size: 4,
  icons: false,
  playerCount: 1,
};

export const initOptions = (customOptions?: Partial<GameOptions>) =>
  writable(
    Object.assign({}, initialOptions, (customOptions || {}) as GameOptions)
  );

export const getGameOptions = () =>
  getContext("gameOptions") as Writable<GameOptions>;
