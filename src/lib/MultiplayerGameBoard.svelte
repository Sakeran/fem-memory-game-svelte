<script lang="ts">
  import { setContext } from "svelte";
  import { getEventBusContext } from "./Events";
  import GameBoard from "./GameBoard.svelte";
  import ResultsModal from "./ResultsModal.svelte";
  import { getGameOptions } from "./stores/gameOptions";

  import { initMultiplayerGameState } from "./stores/multiplayerGameState";

  export let showResults: boolean;

  const events = getEventBusContext();
  const options = getGameOptions();

  const gameState = initMultiplayerGameState();
  setContext("multiplayerGameState", gameState);

  events.on("endedTurn", () => {
    const nextPlayer = ($gameState.activePlayer + 1) % $options.playerCount;
    $gameState.activePlayer = nextPlayer as 0 | 1 | 2 | 3;
  });

  events.on("matchedTokens", () => {
    $gameState.playerScores[$gameState.activePlayer] += 1;
  });

  events.on("allTokensMatched", () => {
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
