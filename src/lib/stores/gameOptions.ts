import { writable } from "svelte/store";

interface GameOptions {
  size: 4 | 6;
  icons: boolean;
}

const initialOptions: GameOptions = {
  size: 6,
  icons: false,
};

export const gameOptions = writable(initialOptions);
