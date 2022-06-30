<script lang="ts">
  import { EventBus } from "./lib/Events";

  import { setContext } from "svelte";
  import Header from "./lib/Header.svelte";
  import GameBoard from "./lib/GameBoard.svelte";
  import { initOptions } from "./lib/stores/gameOptions";

  const eventBus = new EventBus();
  const gameOptions = initOptions();

  setContext("eventBus", eventBus);
  setContext("gameOptions", gameOptions);
</script>

<div class="mb-20 md:mb-[7.5rem] lg:mb-[5.25rem]">
  <Header />
</div>

<!-- Options Menu -->
<!-- TODO -->

<!-- Game Board -->
<main class="mb-8">
  <GameBoard />
</main>
