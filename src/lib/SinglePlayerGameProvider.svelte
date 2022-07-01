<script lang="ts">
  import { setContext } from "svelte";

  import { getEventBusContext } from "./Events";
  import { initSinglePlayerGameState } from "./stores/singlePlayerGameState";

  const events = getEventBusContext();
  const gameState = initSinglePlayerGameState();

  setContext("singlePlayerGameState", gameState);

  // Single Player Game Events
  let timerHandle;

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

<slot />
