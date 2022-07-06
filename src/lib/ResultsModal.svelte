<script lang="ts">
  import { getContext } from "svelte";
  import { scale, fade } from "svelte/transition";

  import type { EventBus } from "./Events";
  import { formatScreenReaderTime, formatTime } from "./helpers/formatTime";
  import ResultsEntry from "./ResultsEntry.svelte";
  import { getGameOptions } from "./stores/gameOptions";
  import { getMultiplayerGameState } from "./stores/multiplayerGameState";
  import { getSinglePlayerGameState } from "./stores/singlePlayerGameState";

  type ResultEntryDefinition = {
    label: string;
    value: string;
    srValue?: string;
    highlight?: boolean;
  };

  const events: EventBus = getContext("eventBus");

  const gameOptions = getGameOptions();
  let spGameState: ReturnType<typeof getSinglePlayerGameState>;
  let mpGameState: ReturnType<typeof getMultiplayerGameState>;

  let resultsHeading;
  let resultsDesc;
  let resultsEntries: ResultEntryDefinition[] = [];

  if ($gameOptions.playerCount === 1) {
    spGameState = getSinglePlayerGameState();
    resultsHeading = "You did it!";
    resultsDesc = "Game over! Here's how you got on...";

    resultsEntries = [];
    
    resultsEntries.push({
      label: "Time Elapsed",
      value: formatTime($spGameState.timeInSeconds),
      srValue: formatScreenReaderTime($spGameState.timeInSeconds),
    });

    resultsEntries.push({
      label: "Moves Taken",
      value: $spGameState.movesMade.toString(),
    });
  } else {
    mpGameState = getMultiplayerGameState();
    
    const scores = Object.entries($mpGameState.playerScores)
    .map(([id, score]) => ({ playerId: parseInt(id) + 1, score }))
    
    .filter((player) => player.playerId <= $gameOptions.playerCount)
    .sort(({ score }, { score: score2 }) => score2 - score);
    
    const highScore = scores[0].score;
    
    const highScoreCount = scores.reduce(
      (acc, el) => (el.score == highScore ? acc + 1 : acc),
      0
    );

    resultsHeading =
      highScoreCount > 1 ? "It's a tie!" : `Player ${scores[0].playerId} Wins!`;

    resultsDesc = "Game over! Here are the results...";

    resultsEntries = scores.map((player) => ({
      label: `Player ${player.playerId}${
        player.score == highScore ? " (Winner!)" : ""
      }`,
      value:`${player.score} Pairs`,
      highlight: player.score == highScore
    }));
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
  in:fade={{ duration: 150, delay: 500 }}
  out:fade={{ duration: 150 }}
/>

<div
  class="z-40 fixed inset-0 grid place-items-center px-6 pointer-events-none"
>
  <div
    in:scale={{ delay: 500 }}
    out:scale
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

    <dl class="flex flex-col gap-2 md:gap-4">
      {#each resultsEntries as entry}
        <ResultsEntry
          heading={entry.label}
          value={entry.value}
          highlight={entry.highlight}
          srValue={entry.srValue}
        />
      {/each}
    </dl>

    <div
      class="flex flex-col md:flex-row gap-4 md:gap-[0.875rem] md:pt-4 text-4.125 md:text-5"
    >
      <!-- svelte-ignore a11y-autofocus -->
      <button
        autofocus
        on:click={() => events.dispatch("restartGame")}
        class="basis-full bg-yellow-800 hover:bg-yellow-900 focus-visible:bg-yellow-900 text-white motion-safe:transition-colors leading-[2.7] rounded-full"
        >Restart</button
      >
      <button
        class="basis-full bg-blue-900 hover:bg-blue-500 focus-visible:bg-blue-500 text-blue-200 hover:text-white focus-visible:text-white motion-safe:transition-colors leading-[2.7] rounded-full"
        on:click={() => events.dispatch("openOptionsMenu")}
        >Setup New Game</button
      >
    </div>
  </div>
</div>
