<script lang="ts">
  import { EventBus } from "./lib/Events";

  import { setContext } from "svelte";
  import Header from "./lib/Header.svelte";
  import GameBoard from "./lib/GameBoard.svelte";
  import { initOptions } from "./lib/stores/gameOptions";
  import MobileMenu from "./lib/MobileMenu.svelte";

  const events = new EventBus();
  const gameOptions = initOptions();

  setContext("eventBus", events);
  setContext("gameOptions", gameOptions);

  let showMobileMenu = false;
  events.on("showMobileMenu", () => (showMobileMenu = true));
  events.on("closeMobileMenu", () => (showMobileMenu = false));
</script>

<div class="mb-20 md:mb-[7.5rem] lg:mb-[5.25rem]">
  <Header />
</div>

<!-- Mobile Menu -->
{#if showMobileMenu}
  <MobileMenu />
{/if}

<!-- Options Menu -->
<!-- TODO -->

<!-- Game Board -->
<main class="mb-8">
  <GameBoard />
</main>
