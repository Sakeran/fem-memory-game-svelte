<script lang="ts">
  import Token from "./Token.svelte";

  import { getContext, onMount } from "svelte";
  import type { GameOptions } from "./stores/gameOptions";
  import type { EventBus } from "./Events";
  import type { Writable } from "svelte/store";
  import { getMultiplayerGameState } from "./stores/multiplayerGameState";

  const gameOptions: Writable<GameOptions> = getContext("gameOptions");
  const events: EventBus = getContext("eventBus");

  const mpState = getMultiplayerGameState();

  type TokenData = { value: number };

  let tokens: TokenData[][] = [];

  function initTokens() {
    const newTokens: TokenData[] = [];
    for (let i = 0; i < ($gameOptions.size * $gameOptions.size) / 2; i++) {
      newTokens.push({ value: i }, { value: i });
    }

    for (let i = newTokens.length - 1; i > 0; i--) {
      const ridx = Math.floor(Math.random() * (i + 1));
      const tmp = newTokens[ridx];
      newTokens[ridx] = newTokens[i];
      newTokens[i] = tmp;
    }

    let tokenRows: TokenData[][] = [];
    for (let i = 0; i < $gameOptions.size; i++) {
      tokenRows.push(
        newTokens.slice($gameOptions.size * i, $gameOptions.size * (i + 1))
      );
    }

    tokens = tokenRows;
  }

  let state: "PlayerTurn" | "ResolvingTurn" = "PlayerTurn";
  let selectedTokens: (TokenData & { animation: Promise<void> })[] = [];

  let matchCount = 0;

  let classes: string;
  let rowClasses: string;
  if ($gameOptions.size == 4) {
    rowClasses = "grid grid-cols-4 gap-3 md:gap-5";
    classes =
      "flex flex-col gap-3 md:gap-5 [--token-fs:2.5rem] md:[--token-fs:3.5rem]";
  } else {
    rowClasses = "grid grid-cols-6 gap-2 md:gap-4";
    classes =
      "flex flex-col gap-2 md:gap-4 [--token-fs:1.5rem] md:[--token-fs:2.75rem]";
  }

  function getToken(row: number, column: number) {
    const button = document.getElementById(`token-${row}-${column}`);
    if (!(button instanceof HTMLButtonElement)) return;

    return button;
  }

  function logTokenSelection(clickDetail) {
    let message = `Selected token ${clickDetail.displayValue} at row ${
      clickDetail.row + 1
    } column ${clickDetail.column + 1}`;
    if ($gameOptions.playerCount > 1) {
      if (!mpState) return;
      message = `Player ${$mpState.activePlayer + 1} ` + message;
    }

    events.dispatch("logMessage", message);
  }

  function logMatched(clickDetail) {
    if ($gameOptions.playerCount == 1) {
      events.dispatch(
        "logMessage",
        `Selected and matched token ${clickDetail.displayValue}.`
      );
      return;
    } else {
      if (!mpState) return;
      events.dispatch(
        "logMessage",
        `Player ${$mpState.activePlayer} selected and matched token ${clickDetail.displayValue}`
      );
    }
  }

  events.on("tokenClick", (clickDetail) => {
    selectedTokens.push(clickDetail);
    logTokenSelection(clickDetail);

    if (selectedTokens.length > 1) {
      state = "ResolvingTurn";

      Promise.all(selectedTokens.map((st) => st.animation)).then(() => {
        if (selectedTokens[0].value == selectedTokens[1].value) {
          matchCount += 1;
          events.dispatch("matchedTokens", selectedTokens[0].value);
          logMatched(clickDetail);
          if (matchCount == ($gameOptions.size * $gameOptions.size) / 2) {
            events.dispatch("allTokensMatched");
          }
        }
        events.dispatch("endedTurn");
        selectedTokens = [];
        setTimeout(() => {
          state = "PlayerTurn";
        }, 50);
      });
    }
  });

  events.on("MoveFocusLeft", (coord) => {
    let { row, column } = coord;
    const token = getToken(row, column - 1);
    if (token) token.focus();
  });

  events.on("MoveFocusRight", (coord) => {
    let { row, column } = coord;
    const token = getToken(row, column + 1);
    if (token) token.focus();
  });

  events.on("MoveFocusUp", (coord) => {
    let { row, column } = coord;
    const token = getToken(row - 1, column);
    if (token) token.focus();
  });

  events.on("MoveFocusDown", (coord) => {
    let { row, column } = coord;
    const token = getToken(row + 1, column);
    if (token) token.focus();
  });

  events.on("MoveFocusToRowStart", (coord) => {
    let { row } = coord;
    const token = getToken(row, 0);
    if (token) token.focus();
  });

  events.on("MoveFocusToRowEnd", (coord) => {
    let { row } = coord;
    const token = getToken(row, $gameOptions.size - 1);
    if (token) token.focus();
  });

  events.on("MoveFocusToNextRow", (coord) => {
    const { row } = coord;

    const token = getToken(row + 1, 0);
    if (token) token.focus();
  });

  events.on("MoveFocusToPreviousRow", (coord) => {
    const { row } = coord;

    const token = getToken(row - 1, 0);
    if (token) token.focus();
  });

  events.on("MoveFocusToGridStart", () => {
    const token = getToken(0, 0);
    if (token) token.focus();
  });

  events.on("MoveFocusToGridEnd", () => {
    const token = getToken($gameOptions.size - 1, $gameOptions.size - 1);
    if (token) token.focus();
  });

  onMount(() => initTokens());
</script>

<div
  class={classes}
  role="grid"
  aria-colcount={$gameOptions.size}
  aria-rowcount={$gameOptions.size}
>
  {#each tokens as row, ridx}
    <div role="row" class={rowClasses}>
      {#each row as token, cidx}
        <Token
          value={token.value}
          selectable={state == "PlayerTurn"}
          useIcon={$gameOptions.icons}
          column={cidx}
          row={ridx}
        />
      {/each}
    </div>
  {/each}
</div>
