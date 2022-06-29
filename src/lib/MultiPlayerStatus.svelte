<script lang="ts">
  import MultiPlayerStatusIndicator from "./MultiPlayerStatusIndicator.svelte";

  export let playerCount: 2 | 3 | 4 = 4;
</script>

<aside class="flex gap-6 md:gap-3 lg:gap-[1.875rem]">
  <MultiPlayerStatusIndicator playerId={0} />
  <MultiPlayerStatusIndicator playerId={1} />
  {#if playerCount > 2}
    <MultiPlayerStatusIndicator playerId={2} />
  {/if}
  {#if playerCount > 3}
    <MultiPlayerStatusIndicator playerId={3} />
  {/if}
</aside>
