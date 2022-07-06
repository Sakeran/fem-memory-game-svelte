<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { slide, fade } from "svelte/transition";
  import { getMultiplayerGameState } from "./stores/multiplayerGameState";
  import { reducedMotion } from "./helpers/reducedMotion";

  export let playerId: number;

  const gameState = getMultiplayerGameState();
  let activeTurn = false;
  $: activeTurn = $gameState.activePlayer == playerId;

  let tailOffset = tweened(activeTurn ? 1 : -0.414213, {
    duration: reducedMotion() ? 0 : 400,
    easing: cubicOut,
  });
  $: tailOffset.set(activeTurn ? 1 : -0.414213); // temp
</script>

<div class="basis-64">
  <div
    class:active-turn={activeTurn}
    class="relative bg-blue-900 py-[0.625rem] md:py-3 md:px-4 lg:py-5 lg:px-6 rounded-sm md:rounded-md flex flex-col lg:flex-row lg:justify-between lg:items-center text-center md:text-left motion-safe:transition-colors motion-safe:duration-700"
  >
    <div
      style:--tail-offset={$tailOffset}
      class="tail absolute -z-10 [--tail-width:1rem] md:[--tail-width:1.5rem] lg:[--tail-width:2.5rem] w-[var(--tail-width)] aspect-square top-0 bg-blue-800 left-1/2 -translate-x-1/2 translate-y-[calc(var(--tail-width)_/_-2_*_var(--tail-offset))] rotate-45 motion-safe:transition-colors motion-safe:duration-500"
    />
    <span
      class="text-sm text-blue-400 motion-safe:transition-colors motion-safe:duration-500 md:hidden leading-none"
      >P{playerId + 1}</span
    >
    <span
      class="text-sm text-blue-400 motion-safe:transition-colors motion-safe:duration-500 hidden md:block lg:text-4.125 leading-none"
      >Player {playerId + 1}</span
    >
    <span
      class="text-blue-200 text-6 lg:text-8 motion-safe:transition-colors motion-safe:duration-500 lg:leading-none"
      >{$gameState.playerScores[playerId]}</span
    >
  </div>

  {#if activeTurn}
    <div
      in:slide
      out:fade={{ duration: 100 }}
      class="current-indicator text-blue-100 hidden lg:block text-center uppercase text-xxs tracking-[0.3125em] pt-6"
    >
      Current Turn
    </div>
  {/if}
</div>

<style lang="postcss">
  .active-turn {
    @apply bg-yellow-800;
  }

  .active-turn > .tail {
    @apply bg-yellow-800;
  }

  .active-turn > span {
    @apply text-white;
  }
</style>
