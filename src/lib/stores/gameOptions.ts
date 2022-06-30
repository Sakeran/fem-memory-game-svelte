import { writable } from "svelte/store";

export interface GameOptions {
  size: 4 | 6;
  icons: boolean;
  playerCount: 1 | 2 | 3 | 4;
}

const initialOptions: GameOptions = {
  size: 6,
  icons: false,
  playerCount: 3,
};

export const initOptions = (customOptions?: Partial<GameOptions>) =>
  writable(
    Object.assign({}, initialOptions, (customOptions || {}) as GameOptions)
  );
