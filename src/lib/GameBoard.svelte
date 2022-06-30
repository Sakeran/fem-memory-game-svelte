<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import MultiPlayerStatus from "./MultiPlayerStatus.svelte";
  import SinglePlayerStatus from "./SinglePlayerStatus.svelte";
  import type { GameOptions } from "./stores/gameOptions";

  import TokenBoard from "./TokenBoard.svelte";

  const gameOptions: Writable<GameOptions> = getContext("gameOptions");
</script>

<div
  class:grid4x4={$gameOptions.size == 4}
  class:grid6x6={$gameOptions.size == 6}
  class="box-content px-6 mx-auto"
>
  <TokenBoard />
</div>

<div class="px-6">
  {#if $gameOptions.playerCount === 1}
    <SinglePlayerStatus />
  {:else}
    <MultiPlayerStatus />
  {/if}
</div>

<style lang="postcss">
  .grid4x4 {
    margin-bottom: 6.375rem;
    max-width: 33.25rem;
  }
  .grid6x6 {
    margin-bottom: 6.375rem;
    max-width: 35.75rem;
  }

  @media screen(md) {
    .grid4x4,
    .grid6x6 {
      margin-bottom: 8rem;
    }
  }

  @media screen(lg) {
    .grid6x6 {
      margin-bottom: 6.375rem;
    }
  }
</style>
