<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { scale, fade } from "svelte/transition";

  import type { EventBus } from "./Events";
  import { formatTime } from "./helpers/formatTime";
  import ResultsEntry from "./ResultsEntry.svelte";
  import { getGameOptions } from "./stores/gameOptions";
  import { getSinglePlayerGameState } from "./stores/singlePlayerGameState";

  const events: EventBus = getContext("eventBus");

  const gameOptions = getGameOptions();
  const singlePlayerGameState = getSinglePlayerGameState();

  let resultsHeading;
  let resultsDesc;
  let resultsEntries;

  if ($gameOptions.playerCount === 1) {
    resultsHeading = "You did it!";
    resultsDesc = "Game over! Here's how you got on...";

    resultsEntries = [
      ["Time Elapsed", formatTime($singlePlayerGameState.timeInSeconds)],
      ["Moves Taken", $singlePlayerGameState.movesMade],
    ];
  } else {
    // TODO
  }

  let modal: HTMLDivElement;

  // Escape Key and focus wrapping
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == "Escape") {
      close();
      return;
    }

    if (e.key == "Tab") {
      const nodes = modal.querySelectorAll("*");
      const focusable = Array.from(nodes).filter(
        (el) => "tabIndex" in el && (el as HTMLElement).tabIndex >= 0
      );

      let currentIndex = focusable.indexOf(
        document.activeElement as HTMLElement
      );
      if (currentIndex === -1 && e.shiftKey) {
        currentIndex = 0;
      }

      currentIndex += focusable.length + (e.shiftKey ? -1 : 1);
      currentIndex %= focusable.length;

      (focusable[currentIndex] as HTMLElement).focus();
      e.preventDefault();
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div
  class="z-30 fixed inset-0 bg-black/50"
  transition:fade={{ duration: 150 }}
/>

<div
  class="z-40 fixed inset-0 grid place-items-center px-6 pointer-events-none"
>
  <div
    transition:scale
    role="dialog"
    aria-modal="true"
    aria-labelledby="game-results-heading"
    aria-describedby="game-results-desc"
    class="z-50 w-full max-w-[40.875rem] bg-white text-4.125 rounded-md flex flex-col gap-6 md:gap-10 pt-8 md:pt-[3.25rem] px-6 md:px-14 pb-6 md:pb-[4.375rem] pointer-events-auto"
    bind:this={modal}
  >
    <div class="flex flex-col gap-2 md:gap-4">
      <div
        id="game-results-heading"
        class="text-6 md:text-12 text-center text-blue-100 leading-tight"
      >
        {resultsHeading}
      </div>
      <div
        id="game-results-desc"
        class="text-xs md:text-4.125 text-center text-blue-400 leading-[1.2]"
      >
        {resultsDesc}
      </div>
    </div>

    <div class="flex flex-col gap-2 md:gap-4">
      {#each resultsEntries as entry}
        <ResultsEntry heading={entry[0]} value={entry[1]} highlight={false} />
      {/each}
    </div>

    <div
      class="flex flex-col md:flex-row gap-4 md:gap-[0.875rem] md:pt-4 text-4.125 md:text-5"
    >
      <!-- svelte-ignore a11y-autofocus -->
      <button
        autofocus
        on:click={() => events.dispatch("restartGame")}
        class="basis-full bg-yellow-800 hover:bg-yellow-900 focus:bg-yellow-900 text-white motion-safe:transition-colors leading-[2.7] rounded-full"
        >Restart</button
      >
      <button
        class="basis-full bg-blue-900 hover:bg-blue-500 focus:bg-blue-500 text-blue-200 hover:text-white focus:text-white motion-safe:transition-colors leading-[2.7] rounded-full"
        >Setup New Game</button
      >
    </div>
  </div>
</div>
