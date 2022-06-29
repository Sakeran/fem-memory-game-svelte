<script lang="ts">
  import { EventBus } from "./lib/Events";

  import ComponentsLibrary from "./lib/ComponentsLibrary.svelte";
  import { setContext } from "svelte";

  setContext("eventBus", new EventBus());
</script>

<main>
  <ComponentsLibrary />
</main>
