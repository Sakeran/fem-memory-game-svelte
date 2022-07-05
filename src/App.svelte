<script lang="ts">
  import { EventBus } from "./lib/Events";

  import { setContext, tick } from "svelte";
  import Header from "./lib/Header.svelte";
  import { initOptions } from "./lib/stores/gameOptions";
  import MobileMenu from "./lib/MobileMenu.svelte";
  import OptionsMenu from "./lib/OptionsMenu.svelte";
  import SinglePlayerGameBoard from "./lib/SinglePlayerGameBoard.svelte";
  import MultiplayerGameBoard from "./lib/MultiplayerGameBoard.svelte";
  import Log from "./lib/Log.svelte";

  type GAME_STATE = "Game" | "Menu" | "Options" | "Results";

  let gameState: GAME_STATE = "Game";

  const events = new EventBus();
  const gameOptions = initOptions();

  setContext("eventBus", events);
  setContext("gameOptions", gameOptions);

  // Track current game by id, and rebuild the game state any time it changes.
  let gameId = 0;

  // Top-Level Events

  events.on("showMobileMenu", () => (gameState = "Menu"));
  events.on("closeMobileMenu", () => (gameState = "Game"));

  events.on("gameOver", () => {
    gameState = "Results";
  });

  events.on("restartGame", () => {
    startNewGame();
  });

  events.on("openOptionsMenu", () => {
    gameState = "Options";
  });

  // Functions

  function startNewGame() {
    gameState = "Game";
    tick().then(() => {
      gameId += 1;
    });
  }
</script>

<div class="mb-20 md:mb-[7.5rem] lg:mb-[5.25rem]">
  <Header />
</div>

<!-- Mobile Menu -->
{#if gameState == "Menu"}
  <MobileMenu />
{/if}

<!-- Options Menu -->
{#if gameState == "Options"}
  <OptionsMenu />
{/if}

{#if gameState !== "Options"}
  {#key gameId}
    <svelte:component
      this={$gameOptions.playerCount == 1
        ? SinglePlayerGameBoard
        : MultiplayerGameBoard}
      showResults={gameState == "Results"}
    />
  {/key}
{/if}

<Log />
