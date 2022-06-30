<script lang="ts">
  import Token from "./Token.svelte";

  import { getContext, onMount } from "svelte";
  import type { GameOptions } from "./stores/gameOptions";
  import type { EventBus } from "./Events";
  import type { Writable } from "svelte/store";

  const gameOptions: Writable<GameOptions> = getContext("gameOptions");
  const events: EventBus = getContext("eventBus");

  type TokenData = { value: number };

  let tokens: TokenData[] = [];

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

    tokens = newTokens;
  }

  let state: "PlayerTurn" | "ResolvingTurn" = "PlayerTurn";
  let selectedTokens: (TokenData & { animation: Promise<void> })[] = [];

  let classes: string;
  if ($gameOptions.size == 4) {
    classes =
      "grid grid-cols-4 gap-3 md:gap-5 [--token-fs:2.5rem] md:[--token-fs:3.5rem]";
  } else {
    classes =
      "grid grid-cols-6 gap-2 md:gap-4 [--token-fs:1.5rem] md:[--token-fs:2.75rem]";
  }

  events.on("tokenClick", (clickDetail) => {
    selectedTokens.push(clickDetail);
    if (selectedTokens.length > 1) {
      state = "ResolvingTurn";

      Promise.all(selectedTokens.map((st) => st.animation)).then(() => {
        if (selectedTokens[0].value == selectedTokens[1].value) {
          events.dispatch("matchedTokens", selectedTokens[0].value);
        }
        events.dispatch("endedTurn");
        selectedTokens = [];
        setTimeout(() => {
          state = "PlayerTurn";
        }, 50);
      });
    }
  });

  onMount(() => initTokens());
</script>

<div class={classes}>
  {#each tokens as token}
    <Token
      value={token.value}
      selectable={state == "PlayerTurn"}
      useIcon={$gameOptions.icons}
    />
  {/each}
</div>
