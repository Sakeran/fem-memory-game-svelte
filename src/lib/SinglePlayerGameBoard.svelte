<script lang="ts">
  import { onDestroy, setContext } from "svelte";

  import { getEventBusContext } from "./Events";
  import GameBoard from "./GameBoard.svelte";
  import ResultsModal from "./ResultsModal.svelte";
  import { initSinglePlayerGameState } from "./stores/singlePlayerGameState";

  const events = getEventBusContext();
  const gameState = initSinglePlayerGameState();

  export let showResults: boolean;

  setContext("singlePlayerGameState", gameState);

  // Single Player Game Events
  let timerHandle;
  onDestroy(() => {
    if (timerHandle !== undefined) {
      clearInterval(timerHandle);
    }
  });

  events.on("startTimer", () => {
    timerHandle = setInterval(() => {
      $gameState.timeInSeconds += 1;
    }, 1000);
  });

  events.on("pauseTimer", () => {
    clearInterval(timerHandle);
  });

  events.on("showMobileMenu", () => {
    if ($gameState.timerStarted) {
      events.dispatch("pauseTimer");
    }
  });

  events.on("closeMobileMenu", () => {
    if ($gameState.timerStarted) {
      events.dispatch("startTimer");
    }
  });

  events.on("openOptionsMenu", () => {
    events.dispatch("pauseTimer");
  });

  events.on("tokenClick", () => {
    if (!$gameState.timerStarted) {
      $gameState.timerStarted = true;
      events.dispatch("startTimer");
    }
  });

  events.on("endedTurn", () => {
    $gameState.movesMade += 1;
  });

  events.on("allTokensMatched", () => {
    events.dispatch("pauseTimer");
    events.dispatch("gameOver");
  });
</script>

<!-- Results Modal -->
{#if showResults}
  <ResultsModal />
{/if}

<!-- Game Board -->
<main class="mb-8">
  <GameBoard />
</main>
