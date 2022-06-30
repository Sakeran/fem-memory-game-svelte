<script lang="ts">
  import { EventBus } from "./lib/Events";

  import { setContext } from "svelte";
  import Header from "./lib/Header.svelte";
  import GameBoard from "./lib/GameBoard.svelte";

  setContext("eventBus", new EventBus());
</script>

<Header />

<!-- Options Menu -->
<!-- TODO -->

<!-- Game Board -->
<main>
  <GameBoard />
</main>
