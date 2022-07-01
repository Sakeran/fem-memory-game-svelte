<script lang="ts">
  import { EventBus } from "./lib/Events";

  import { setContext } from "svelte";
  import Header from "./lib/Header.svelte";
  import GameBoard from "./lib/GameBoard.svelte";
  import { initOptions } from "./lib/stores/gameOptions";
  import MobileMenu from "./lib/MobileMenu.svelte";
  import OptionsMenu from "./lib/OptionsMenu.svelte";
import ResultsModal from "./lib/ResultsModal.svelte";

  const events = new EventBus();
  const gameOptions = initOptions();

  setContext("eventBus", events);
  setContext("gameOptions", gameOptions);

  let showMobileMenu = false;
  events.on("showMobileMenu", () => (showMobileMenu = true));
  events.on("closeMobileMenu", () => (showMobileMenu = false));

  let showOptionsMenu = false;

  let showResultsModal = true;
</script>

<div class="mb-20 md:mb-[7.5rem] lg:mb-[5.25rem]">
  <Header />
</div>

<!-- Mobile Menu -->
{#if showMobileMenu}
  <MobileMenu />
{/if}

<!-- Options Menu -->
{#if showOptionsMenu}
  <OptionsMenu />
{/if}

<!-- Results Modal -->
{#if showResultsModal}
  <ResultsModal />
{/if}

<!-- Game Board -->
<main class="mb-8">
  <GameBoard />
</main>
