<script lang="ts">
  import { expoOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  import Icon from "./Icon.svelte";

  // export let tokenId: string;
  export let value: number;
  export let useIcon: boolean;
  export let selectable: boolean;

  const matchScale = tweened(0, { easing: expoOut });
  $: matchScale.set(false ? 1 : 0); // temp

  const tokenRotation = tweened(180, { easing: expoOut });

  function handleClick(e) {
    e.preventDefault();
    if (!selectable || !false) return; // stub

    tokenRotation.set($tokenRotation + 180);
  }
</script>

<div
  on:click={handleClick}
  class:cursor-pointer={selectable && false}
  class="relative aspect-square rounded-round grid place-items-center text-white text-token origin-center"
  style:--token-match-scale={$matchScale}
  style:--token-rotate={`${$tokenRotation}deg`}
>
  <!-- Front Face -->
  <div class="token-ff absolute inset-0">
    <!-- Background -->
    <div
      class="absolute bg-blue-800 inset-0 rounded-round z-0 pointer-events-none"
    />

    <!-- Matched Background -->
    <div
      class="absolute bg-yellow-800 inset-0 rounded-round z-0 pointer-events-none scale-[var(--token-match-scale)]"
    />

    <!-- Icon/Number -->
    <div class="z-10 absolute inset-0 grid place-items-center">
      {#if useIcon}
        <div class="w-token-icon">
          <Icon iconIndex={value} />
        </div>
      {:else}
        {value + 1}
      {/if}
    </div>
  </div>

  <!-- Back Face -->
  <div
    class="token-bf z-10 absolute inset-0 bg-blue-100 rounded-round pointer-events-none"
  />
</div>

<style>
  .token-ff {
    transform: rotateY(calc(var(--token-rotate, 0deg)));
    backface-visibility: hidden;
  }

  .token-bf {
    transform: rotateY(calc(var(--token-rotate, 0deg) + 180deg));
    backface-visibility: hidden;
  }
</style>
