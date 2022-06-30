<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import MultiPlayerStatusIndicator from "./MultiPlayerStatusIndicator.svelte";
  import type { GameOptions } from "./stores/gameOptions";

  const gameOptions: Writable<GameOptions> = getContext("gameOptions");
</script>

<aside class="flex gap-6 md:gap-3 lg:gap-[1.875rem] justify-center">
  <MultiPlayerStatusIndicator playerId={0} />
  <MultiPlayerStatusIndicator playerId={1} />
  {#if $gameOptions.playerCount > 2}
    <MultiPlayerStatusIndicator playerId={2} />
  {/if}
  {#if $gameOptions.playerCount > 3}
    <MultiPlayerStatusIndicator playerId={3} />
  {/if}
</aside>
