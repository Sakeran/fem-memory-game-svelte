<script lang="ts">
  import Token from "./Token.svelte";

  import { getContext, onMount } from "svelte";
  import type { GameOptions } from "./stores/gameOptions";
  import type { EventBus } from "./Events";
  import type { Writable } from "svelte/store";

  const gameOptions: Writable<GameOptions> = getContext("gameOptions");
  const events: EventBus = getContext("eventBus");

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
  if ($gameOptions.size == 4) {
    classes =
      "grid grid-cols-4 gap-3 md:gap-5 [--token-fs:2.5rem] md:[--token-fs:3.5rem]";
  } else {
    classes =
      "grid grid-cols-6 gap-2 md:gap-4 [--token-fs:1.5rem] md:[--token-fs:2.75rem]";
  }

  function getToken(row: number, column: number) {
    const button = document.getElementById(`token-${row}-${column}`);
    if (!(button instanceof HTMLButtonElement)) return;

    return button;
  }

  events.on("tokenClick", (clickDetail) => {
    selectedTokens.push(clickDetail);

    if (selectedTokens.length > 1) {
      state = "ResolvingTurn";

      Promise.all(selectedTokens.map((st) => st.animation)).then(() => {
        if (selectedTokens[0].value == selectedTokens[1].value) {
          matchCount += 1;
          events.dispatch("matchedTokens", selectedTokens[0].value);
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

    for (let cidx = column - 1; cidx >= 0; cidx--) {
      const token = getToken(row, cidx);
      if (!token.disabled) {
        return token.focus();
      }
    }
  });

  events.on("MoveFocusRight", (coord) => {
    let { row, column } = coord;

    for (let cidx = column + 1; cidx < $gameOptions.size; cidx++) {
      const token = getToken(row, cidx);
      if (!token.disabled) {
        return token.focus();
      }
    }
  });

  events.on("MoveFocusUp", (coord) => {
    let { row, column } = coord;

    for (let ridx = row - 1; ridx >= 0; ridx--) {
      const token = getToken(ridx, column);
      if (!token.disabled) {
        return token.focus();
      }
    }
  });

  events.on("MoveFocusDown", (coord) => {
    let { row, column } = coord;

    for (let ridx = row + 1; ridx < $gameOptions.size; ridx++) {
      const token = getToken(ridx, column);
      if (!token.disabled) {
        return token.focus();
      }
    }
  });

  events.on("MoveFocusToRowStart", (coord) => {
    let { row } = coord;

    for (let cidx = 0; cidx < $gameOptions.size; cidx++) {
      const token = getToken(row, cidx);
      if (!token.disabled) {
        return token.focus();
      }
    }
  });

  events.on("MoveFocusToRowEnd", (coord) => {
    let { row } = coord;

    for (let cidx = $gameOptions.size - 1; cidx >= 0; cidx--) {
      const token = getToken(row, cidx);
      if (!token.disabled) {
        return token.focus();
      }
    }
  });

  events.on("MoveFocusToNextRow", (coord) => {
    const { row } = coord;

    for (let ridx = row + 1; ridx < $gameOptions.size; ridx++) {
      for (let cidx = 0; cidx < $gameOptions.size; cidx++) {
        const token = getToken(ridx, cidx);
        if (!token.disabled) {
          return token.focus();
        }
      }
    }
  });

  events.on("MoveFocusToPreviousRow", (coord) => {
    const { row } = coord;

    for (let ridx = row - 1; ridx >= 0; ridx--) {
      for (let cidx = 0; cidx < $gameOptions.size; cidx++) {
        const token = getToken(ridx, cidx);
        if (!token.disabled) {
          return token.focus();
        }
      }
    }
  });

  events.on("MoveFocusToGridStart", () => {
    for (let ridx = 0; ridx < $gameOptions.size; ridx++) {
      for (let cidx = 0; cidx < $gameOptions.size; cidx++) {
        const token = getToken(ridx, cidx);
        if (!token.disabled) {
          return token.focus();
        }
      }
    }
  });

  events.on("MoveFocusToGridEnd", () => {
    for (let ridx = $gameOptions.size - 1; ridx >= 0; ridx--) {
      for (let cidx = $gameOptions.size - 1; cidx >= 0; cidx--) {
        const token = getToken(ridx, cidx);
        if (!token.disabled) {
          return token.focus();
        }
      }
    }
  });

  events.on("FocusNextToken", (coord) => {
    const { row, column } = coord;

    for (let ridx = row; ridx < $gameOptions.size; ridx++) {
      for (
        let cidx = ridx === row ? column + 1 : 0;
        cidx < $gameOptions.size;
        cidx++
      ) {
        const token = getToken(ridx, cidx);
        if (!token.disabled) {
          return token.focus();
        }
      }
    }

    // If we haven't found anything to focus on yet, start from beginning.
    events.dispatch("MoveFocusToGridStart", coord);
  });

  events.on("FocusToken", (coord) => {
    const token = getToken(coord.row, coord.column);
    if (!token) return;

    token.focus();
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
    <div class="contents" role="row">
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
